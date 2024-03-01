interface SidebarRowProps {
    Icon: React.ElementType;
    title: string;
}

function SidebarRow({ Icon, title }: SidebarRowProps) {
    return (
        <div className="flex p-3 cursor-pointer hover:bg-opacity-5 hover:bg-black">
            {Icon && (
                <div className="h-8 w-8 text-blue-500">
                    <Icon />
                </div>
            )}
            <p className="hidden sm:inline-flex font-medium ml-2 items-center">{title}</p>
        </div>
    );
}

export default SidebarRow;
