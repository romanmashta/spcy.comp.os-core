import _ from "lodash";
import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { observer } from "mobx-react";
import {
  Button,
  Container,
  createStyles,
  Grid,
  Paper,
  Theme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { number } from "@storybook/addon-knobs";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      ...theme.typography.body2,
      whiteSpace: "pre-wrap",
      minHeight: "1em",
      width: "100%",
      "&:focus": {
        outline: "none",
      },
    },
    "@global": {
      "[contenteditable]:empty:before": {
        content: "attr(placeholder)",
        display: "block",
        color: theme.palette.text.secondary,
      },
    },
  })
);

export const Placeholder: React.FC<{
  id: string;
  index: number;
  size: number;
}> = (props) => {
  const { id, index, size } = props;
  const classes = useStyles();
  const [isFocused, setFocused] = useState(false);

  return (
    <>
      <Draggable draggableId={id} index={index}>
        {(provided) => (
          <Grid
            item
            xs={size}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Paper>
              <div
                contentEditable={false}
                className={classes.content}
                placeholder={isFocused ? "Type something" : ""}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              >
                {`item: ${id}`}
              </div>
            </Paper>
          </Grid>
        )}
      </Draggable>
    </>
  );
};

export const Content: React.FC<{ object: unknown }> = (props) => {
  const classes = useStyles();
  const [elements, setItems] = useState(["one", "two", "three"]);
  const { object } = props;

  const onDragEnd = (drop: DropResult) => {
    if (!drop.destination) {
      return;
    }

    if (drop.destination.index === drop.source.index) {
      return;
    }

    const source = drop.source.index;
    const dest = drop.destination.index;

    const result = [...elements];
    result[source] = elements[dest];
    result[dest] = elements[source];
    setItems(result);
  };

  return (
    <>
      <Container>
        Text here
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="list">
            {(provided) => (
              <Grid
                container
                spacing={3}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {_.map(elements, (id, ind: number) => (
                  <Placeholder key={id} id={id} index={ind} size={6} />
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </>
  );
};
