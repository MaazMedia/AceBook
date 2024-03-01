import Image from "next/image";
interface ContactProps {
    src: string;
    name: string;
}

function Contact({ src, name }: ContactProps) {
    return (

        <div className="flex items-center space-x-3 mb-2 hover:bg-gray-200 cursor-pointer relative p-2 rounded-xl ">
            <Image
                objectFit="cover"
                src={src}
                alt="Image"
                className="rounded-full"
                width={50}
                height={50}
                layout="fixed"
            />
            <p>{name}</p>
            <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full"></div>
        </div>

    )
}

export default Contact
