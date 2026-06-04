import type { TaskSuggestion, TaskSuggestionPatch } from "../types/planner";
import { EditableField } from "./EditableField";

export function TaskCard({
  item,
  onChange,
}: {
  item: TaskSuggestion;
  onChange: (id: string, patch: TaskSuggestionPatch) => void;
}) {
  return (
    <article className={item.selected ? "task-card selected" : "task-card"}>
      <header>
        <input
          type="checkbox"
          checked={item.selected}
          onChange={(event) => onChange(item.id, { selected: event.target.checked })}
        />
        <EditableField
          label="Title"
          value={item.title}
          onChange={(value) => onChange(item.id, { title: value })}
        />
      </header>
      <EditableField
        label="Detail"
        value={item.detail}
        onChange={(value) => onChange(item.id, { detail: value })}
      />
      <EditableField
        label="Day"
        value={item.day}
        onChange={(value) => onChange(item.id, { day: value })}
      />
      <EditableField
        label="Duration"
        value={item.duration}
        onChange={(value) => onChange(item.id, { duration: value })}
      />
    </article>
  );
}
