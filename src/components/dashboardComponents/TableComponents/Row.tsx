import { TableRow } from "@mui/material";
import { Token, Transaction } from "../../../shared/types/types";
import CellsForTable from "./CellsForTable";
import React, { useRef } from "react";

type Props = {
  dataFromList: Token & Transaction;
  draggable?: boolean;
  firstElementClick?: Function;
  handleDragStart?: (event: React.DragEvent, position: number) => void;
  handleDragEnter?: (event: React.DragEvent, position: number, id: string) => void;
  handleDragEnd?: (event: React.DragEvent) => void;
  color: string;
  index: number;
  namedProperties: string[];
};

export default function Row(props: Props) {
  const rowReference = useRef(null);
  function handleClick() {
    if (props.firstElementClick !== undefined) {
      props.firstElementClick(props.dataFromList);
    }
  }

  function dragStart(e: React.DragEvent) {
    if (props.handleDragStart) {
      props.handleDragStart(e, props.index);
    }
  }
  function dragEnter(e: React.DragEvent) {
    if (props.handleDragEnter) {
      props.handleDragEnter(e, props.index, props.dataFromList.id);
    }
  }

  function dragEnd(e: React.DragEvent) {
    if (props.handleDragEnd) {
      props.handleDragEnd(e);
    }
  }

  return (
    <TableRow
      ref={rowReference}
      id={props.dataFromList.id}
      draggable={props.draggable}
      onDragStart={dragStart}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={dragEnter}
      onDragEnd={dragEnd}
      key={props.dataFromList.id || props.dataFromList.txDate}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      {props.namedProperties.map((property, i) => (
        <CellsForTable
          color={props.color}
          firstElementClick={i === 0 && props.firstElementClick ? handleClick : undefined}
          key={property}
          property={property}
          cellPlacement={i}
          dataFromList={props.dataFromList}
        />
      ))}
    </TableRow>
  );
}
