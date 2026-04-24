import { statusConfig } from "../util/StatusConfig";


export function StatusBadge({ status }) {
  const config = statusConfig[status];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <span
      className={`
        inline-flex items-center gap-1
        px-3 py-1
        rounded-full text-xs font-medium
        w-fit
        ${config.color}
      `}
    >
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
}