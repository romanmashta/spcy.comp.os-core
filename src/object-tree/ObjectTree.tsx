import _ from "lodash";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import * as mst from "@spcy/lib.core.mst-model";
import * as cr from "@spcy/lib.core.reflection";
import * as mc from "@spcy/lib.model.core";
import {
  Inspector,
  ObjectRootLabel,
  ObjectLabel,
} from "@spcy/pub.react-inspector";
import { observer } from "mobx-react";
import { useOnClickOutside } from "../hooks";

interface Node {
  name: string;
  type?: string;
  data?: unknown;
}

const getTypeName = (typeInfo: cr.TypeInfo, data?: any): string => {
  if (cr.isArrayType(typeInfo)) return `${getTypeName(typeInfo.items)}[]`;
  if (
    cr.isStringType(typeInfo) ||
    cr.isDateType(typeInfo) ||
    cr.isNumberType(typeInfo) ||
    cr.isBooleanType(typeInfo)
  )
    return typeInfo.type;
  if (cr.isTypeReference(typeInfo) && typeInfo.$ref === "ReferenceSet" && data)
    return `*[]:${getTypeName(data.$type)}`;
  if (cr.isObjectType(typeInfo) && typeInfo.additionalProperties)
    return typeof typeInfo.additionalProperties === "boolean"
      ? "[]:{}"
      : `[]:${getTypeName(typeInfo.additionalProperties)}`;
  if (cr.isObjectType(typeInfo)) return `${typeInfo.$id || "object"}`;
  if (cr.isTypeReference(typeInfo)) return `${typeInfo.$ref}`;
  return "unknown " + JSON.stringify(typeInfo);
};

const referenceSetIterator = function* (data: any) {
  yield* _.map([...data.objects.keys()], (name) => {
    const value = data.objects.get(name);
    const propertyType = mst.getObjectSchema(value);
    const type = getTypeName(propertyType);
    return { name, type, data: value };
  });
};

const mapIterator = function* (data: any, typeInfo: cr.ObjectType) {
  yield* _.map([...data.keys()], (name) => {
    const value = data.get(name);
    const propertyType = mst.getObjectSchema(value);
    const type = getTypeName(propertyType, value);
    return { name, type, data: value };
  });
};

const objectIterator = function* (data: any, typeInfo: cr.ObjectType) {
  yield* _.map(typeInfo.properties, (propertyType, name) => {
    const value = data[name];
    const type = getTypeName(propertyType, value);
    return { name, type, data: value, context: data };
  });
};

const arrayIterator = function* (data: any, typeInfo: cr.ArrayType) {
  const type = getTypeName(typeInfo.items);

  yield* _.map(data, (item, name) => {
    return { name, type, data: item, context: data };
  });
};

const createIterator = () => {
  const iterator = function* (data: any) {
    if (!data) return;

    if (!mst.isObject(data)) return;

    const typeInfo = mst.getObjectSchema(data);

    if (!typeInfo) return;

    if (cr.isArrayType(typeInfo)) {
      yield* arrayIterator(data, typeInfo);
    } else if (cr.isObjectType(typeInfo)) {
      if (typeInfo.$id === "ReferenceSet") {
        yield* referenceSetIterator(data);
      } else if (typeInfo.additionalProperties) {
        yield* mapIterator(data, typeInfo);
      } else {
        yield* objectIterator(data, typeInfo);
      }
    }
  };
  return iterator;
};

const ValueEditor: React.FC<{
  data: any;
  name: string;
  context: any;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const { data, toggle, context, name } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef && inputRef.current && inputRef.current.focus();
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!context) return;
    context.patch((self) => {
      self[name] = event.target.value;
    });
  };

  useOnClickOutside(inputRef, () => toggle(false));
  return <input ref={inputRef} value={data} onChange={onChange} />;
};

const ValueDecorator: React.FC<{ data: any; name: string; context: any }> = (
  props
) => {
  const { data, name, context } = props;
  const [editMode, toggle] = useState(false);
  return (
    <span onClick={() => toggle(true)}>
      {editMode ? (
        <ValueEditor
          name={name}
          data={data}
          toggle={toggle}
          context={context}
        />
      ) : (
        props.children
      )}
    </span>
  );
};

const NodeDecorator: React.FC<{ data: any; name: string }> = (props) => {
  const { data, name } = props;
  useEffect(() => {
    const activable =
      data && mst.isObject(data) && mc.queryInterface(data, mc.Types.Activable);
    if (activable) activable.activate();

    return () => {
      if (activable) activable.deactivate();
    };
  });
  return <>{props.children}</>;
};

const nodeRenderer: React.FC<{
  depth: number;
  name: string;
  data: any;
  type: any;
  isNonenumerable: boolean;
}> = (props) =>
  props.depth === 0 ? (
    <NodeDecorator {...props}>
      <ObjectRootLabel {...props} />
    </NodeDecorator>
  ) : (
    <NodeDecorator {...props}>
      <ObjectLabel valueDecorator={ValueDecorator} {...props} />
    </NodeDecorator>
  );

export const ObjectTree: React.FC<{ object: unknown }> = observer((props) => {
  const { object } = props;
  return (
    <Inspector
      expandLevel={1}
      data={object}
      nodeRenderer={nodeRenderer}
      objectIterator={createIterator()}
    />
  );
});
