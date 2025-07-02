import { Badge } from "@/components/ui/badge";
import { Circle, AlertTriangle, X, Wifi } from "lucide-react";

interface StatusIndicatorProps {
  status: 'connected' | 'warning' | 'error' | 'offline';
}

const statusConfig = {
  connected: {
    icon: Circle,
    label: "Verbunden",
    variant: "default" as const,
    className: "bg-status-connected text-white"
  },
  warning: {
    icon: AlertTriangle,
    label: "Warnung",
    variant: "secondary" as const,
    className: "bg-status-warning text-white"
  },
  error: {
    icon: X,
    label: "Fehler",
    variant: "destructive" as const,
    className: "bg-status-error text-white"
  },
  offline: {
    icon: Wifi,
    label: "Offline",
    variant: "secondary" as const,
    className: "bg-status-offline text-white"
  }
};

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className={`${config.className} flex items-center space-x-1`}>
      <Icon className="h-3 w-3" />
      <span>{config.label}</span>
    </Badge>
  );
}