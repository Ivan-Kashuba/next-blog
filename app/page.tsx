import Image from 'next/image';

const imagePath =
    'https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg';

export default function Home() {
    return (
        <div className="m-auto text-center">
            <div>Home page</div>
            <Image
                className="text-center m-auto"
                src={imagePath}
                alt="Photo of camera"
                width={300}
                height={300}
            />
        </div>
    );
}
