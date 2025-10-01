interface Props {
    icon: React.ElementType;
    label: string;
    value: React.ReactNode;
}

export function InfoBlock({ icon: Icon, label, value }: Props) {
    return (
        <div>
            <dt className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <Icon className="w-4 h-4 text-gray-400" /> {label}
            </dt>
            <dd className="mt-1 text-sm font-semibold text-gray-900 sm:col-span-2 sm:mt-0">{value}</dd>
        </div>
    );
}