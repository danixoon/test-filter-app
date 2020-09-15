import * as React from "react";
import { ChevronDown } from "react-feather";
import { mergeProps } from "../../utils";
import "./styles.scss";

interface TableHeader {
  displayName: string;
  propertyName: string;
  sortable?: boolean;
}

interface TableProps
  extends React.PropsWithChildren<React.TableHTMLAttributes<HTMLTableElement>> {
  items: any[];
  headers: TableHeader[];
  maxRows?: number;

  selectedRowId?: string;

  sortOrder?: "ASC" | "DESC";
  sortProperty?: keyof DataItem | null;

  onTableRowClick: (item: any) => void;
  onSortChange: (
    sortOrder: "ASC" | "DESC",
    sortProperty: keyof DataItem
  ) => void;
}

const HeaderCell: React.FC<{
  header: TableHeader;
  sortOrder?: "ASC" | "DESC";
  onSortChange: () => void;
}> = (props) => {
  const { header, onSortChange, sortOrder } = props;
  return (
    <td className="table__cell">
      <a
        role="button"
        tabIndex={0}
        className="table__header-cell"
        onClick={onSortChange}
      >
        <span> {header.displayName} </span>
        {header.sortable && sortOrder && (
          <ChevronDown
            style={{
              height: "20px",
              transform: `rotate(${sortOrder === "ASC" ? 0 : 180}deg)`,
            }}
          />
        )}
      </a>
    </td>
  );
};

const Table: React.FC<TableProps> = (props: TableProps) => {
  const {
    items,
    headers,
    maxRows = 10,
    sortOrder = "ASC",
    sortProperty,
    selectedRowId,
    onSortChange,
    onTableRowClick,
    ...rest
  } = props;

  return (
    <table {...mergeProps({ className: "table" }, rest)}>
      <tbody>
        <tr className="table__row">
          {headers.map((header, i) => (
            <HeaderCell
              key={header.propertyName}
              sortOrder={
                sortProperty === header.propertyName ? sortOrder : undefined
              }
              header={header}
              onSortChange={() =>
                onSortChange(
                  sortOrder === "ASC" ? "DESC" : "ASC",
                  header.propertyName as keyof DataItem
                )
              }
            />
          ))}
        </tr>
        {items.map((item, i) => (
          <tr
            key={item.uuid}
            className={
              "table__row " +
              (item.uuid === selectedRowId ? "table-row_selected" : "")
            }
            onClick={() => onTableRowClick(item)}
          >
            {headers.map((header) => (
              <td key={header.propertyName} className="table__cell">
                {item[header.propertyName]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
