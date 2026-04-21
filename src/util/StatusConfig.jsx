import { CheckCircle, Clock, Package, Truck, XCircle } from "lucide-react";

export const statusConfig = {
  pendente: {
    label: 'Pendente',
    icon: Clock,
    color: 'text-yellow-600 bg-yellow-50'
  },
  preparando: {
    label: 'Preparando',
    icon: Package,
    color: 'text-blue-600 bg-blue-50'
  },
  pronto: {
    label: 'Pronto',
    icon: CheckCircle,
    color: 'text-green-600 bg-green-50'
  },
  entregue: {
    label: 'Entregue',
    icon: Truck,
    color: 'text-gray-600 bg-gray-50'
  },
  cancelado: {
    label: 'Cancelado',
    icon: XCircle,
    color: 'text-red-600 bg-red-50'
  }
};