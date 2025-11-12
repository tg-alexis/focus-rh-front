import Image from "next/image";

const Logo = () => {
	return (
		<Image
			src="/logo.webp"
			alt="Logo"
			objectFit="contain"
			width={300}
			height={200}
		/>
	);
};

export default Logo;
