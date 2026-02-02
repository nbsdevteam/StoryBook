import * as React from "react";
import { cn } from "../../utils/cn";
import styles from "./Combobox.module.css";
import { ComboboxProps } from "./Combobox.types";

export const Combobox: React.FC<ComboboxProps> = ({ config, className }) => {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const options = config?.options ?? [];
  const filtered = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (value: any, label: string) => {
    config?.onValueChange?.(value);
    setSearch(label);
    setOpen(false);
  };

  return (
    <div className={cn(styles.root, className)}>
      <input
        type="text"
        className={styles.input}
        placeholder={config?.searchPlaceholder ?? config?.placeholder ?? "Select"}
        value={search || config?.value || ""}
        onChange={(event) => {
          setSearch(event.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        disabled={config?.disabled}
      />
      {open && (
        <div className={styles.list}>
          {filtered.length === 0 && (
            <div className={styles.empty}>
              {config?.emptyMessage ?? "No results"}
            </div>
          )}
          {filtered.map((option) => (
            <div
              key={String(option.value)}
              className={cn(styles.item, option.disabled ? styles.itemDisabled : "")}
              onClick={() =>
                !option.disabled && handleSelect(option.value, option.label)
              }
            >
              {config?.renderOption ? config.renderOption(option) : option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Combobox;
