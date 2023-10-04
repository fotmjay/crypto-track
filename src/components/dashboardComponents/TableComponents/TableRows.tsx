// React & Mui
import { TableBody } from "@mui/material";

// Types
import type { Props } from "./TableRowsTypes";
import Row from "./Row";
import { useRef } from "react";
import { Token } from "../../../shared/types/types";

// Main
export default function TableRows(props: Props) {
  const initialPosition = useRef<number | null>(null);
  const endPosition = useRef<number | null>(null);
  const endPositionId = useRef<string | null>(null);
  const tableBodyReference = useRef<HTMLTableSectionElement | null>(null);

  function handleDragStart(event: React.DragEvent, position: number) {
    event.dataTransfer.effectAllowed = "move";
    initialPosition.current = position;
  }
  function handleDragEnter(_event: React.DragEvent, position: number, id: string) {
    endPosition.current = position;
    endPositionId.current = id;
  }
  function handleDragEnd(event: React.DragEvent) {
    if (props.setDataList) {
      // Ensures none of the positions are null and validates the click within the boundaries of the table
      if (validateRefsAreNotNull() && clickIsValid(event)) {
        topOrBottomOfRow(event);
        props.setDataList((data) => {
          const movedItem = data[initialPosition.current!];
          const newList: Token[] = [];
          data.forEach((token: Token, i: number) => {
            if (i === endPosition.current) {
              newList.push(movedItem);
            } else if (i === initialPosition.current) {
              return;
            }
            newList.push(token);
          });
          // If it was placed as last row, it didn't get processed in the "forEach", add it at the end
          if (newList.length !== data.length) {
            newList.push(movedItem);
          }
          localStorage.setItem("savedList", JSON.stringify(newList));
          return newList;
        });
      }
    }
  }

  function validateRefsAreNotNull() {
    if (initialPosition.current !== endPosition.current && initialPosition.current !== null && endPosition.current !== null && endPositionId.current !== null) {
      return true;
    } else {
      return false;
    }
  }

  function clickIsValid(event: React.DragEvent) {
    const boundaries = tableBodyReference.current?.getBoundingClientRect()!;
    if (event.clientX < boundaries.left || event.clientX > boundaries.left + boundaries.width) {
      return false;
    } else if (event.clientY < boundaries.top || event.clientY > boundaries.top + boundaries.height) {
      return false;
    } else {
      return true;
    }
  }

  function topOrBottomOfRow(event: React.DragEvent) {
    // Get the specific row's boundaries and figure if click is in top half or bottom half
    // Set the end position accordingly (on top or bottom of dragEnd row)
    const specificRowBoundaries = document.getElementById(endPositionId.current!)?.getBoundingClientRect();
    if (event.clientY > specificRowBoundaries!.top + specificRowBoundaries!.height / 2) {
      endPosition.current! += 1;
    }
  }

  return (
    <TableBody ref={tableBodyReference}>
      {props.dataList.map((data: any, index: number) => (
        <Row
          color={data.color || ""}
          key={data.id || data.txDate}
          index={index}
          firstElementClick={props.firstElementClick}
          dataFromList={data}
          namedProperties={props.namedProperties}
          draggable={props.draggable}
          handleDragStart={handleDragStart}
          handleDragEnter={handleDragEnter}
          handleDragEnd={handleDragEnd}
        />
      ))}
    </TableBody>
  );
}
