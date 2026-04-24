export function DashboardCard({
  titulo,
  valor,
  descricao,
  Icon,
  iconColor = 'text-gray-600'
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600">{titulo}</p>
        <Icon className={`w-8 h-8 ${iconColor}`} />
      </div>

      <p className="text-gray-900 text-2xl font-bold">
        {valor}
      </p>

      {descricao && (
        <p className="text-sm text-gray-500">
          {descricao}
        </p>
      )}
    </div>
  );
}