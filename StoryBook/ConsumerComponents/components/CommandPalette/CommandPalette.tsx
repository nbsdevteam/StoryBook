import * as React from "react";
import { cn } from "../../utils/cn";
import styles from "./CommandPalette.module.css";
import { CommandPaletteProps } from "./CommandPalette.types";

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  config,
  className,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const isControlled = typeof config?.open === "boolean";
  const open = isControlled ? config?.open : internalOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    config?.onOpenChange?.(next);
  };

  React.useEffect(() => {
    if (!config?.shortcut) return;
    const handler = (event: KeyboardEvent) => {
      const key = config.shortcut?.toLowerCase();
      if (!key) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === key) {
        event.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [config?.shortcut]);

  if (!open) return null;

  const filteredGroups = (config?.groups ?? []).map((group) => ({
    ...group,
    commands: group.commands.filter((command) => {
      const haystack = [
        command.label,
        ...(command.keywords ?? []),
        command.shortcut ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query.toLowerCase());
    }),
  }));

  const hasResults = filteredGroups.some((group) => group.commands.length > 0);

  return (
    <div className={styles.overlay} onClick={() => setOpen(false)}>
      <div
        className={cn(styles.panel, className)}
        onClick={(event) => event.stopPropagation()}
      >
        <input
          className={styles.input}
          placeholder={config?.placeholder ?? "Type a command..."}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus
        />
        {!hasResults && (
          <div className={styles.empty}>
            {config?.emptyMessage ?? "No results found"}
          </div>
        )}
        {filteredGroups.map((group, index) => (
          <div key={`${group.heading}-${index}`} className={styles.group}>
            {group.heading && (
              <div className={styles.heading}>{group.heading}</div>
            )}
            {group.commands.map((command) => (
              <div
                key={command.id}
                className={cn(
                  styles.item,
                  command.disabled ? styles.itemDisabled : ""
                )}
                onClick={() => {
                  if (command.disabled) return;
                  command.onSelect();
                  setOpen(false);
                }}
              >
                {command.icon && <command.icon size={16} />}
                {command.label}
                {config?.showShortcuts && command.shortcut && (
                  <span className={styles.shortcut}>{command.shortcut}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommandPalette;
