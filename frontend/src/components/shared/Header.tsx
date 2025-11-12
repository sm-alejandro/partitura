import {
	Burger,
	Container,
	Group,
	Image,
	TextInput,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./HeaderSearch.module.css";

const links = [
	{ link: "/songs", label: "Songs" },
	{ link: "/authors", label: "Authors" },
	{ link: "/categories", label: "Categories" },
	{ link: "/playlists", label: "Playlists" },
];

function Header() {
	const navigate = useNavigate();
	let location = useLocation();

	const setValue = (query: string) => {
		setActive("/songs");
		navigate(`/songs?query=${encodeURIComponent(query.trim())}`);
	};

	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(location.pathname);

	const items = links.map((link) => (
		<a
			key={link.label}
			href={link.link}
			className={classes.link}
			data-active={active === link.link || undefined}
			onClick={(event) => {
				event.preventDefault();
				setActive(link.link);
				navigate(link.link);
			}}
		>
			{link.label}
		</a>
	));

	return (
		<header className={classes.header}>
			<Container size="xl" className={classes.inner}>
				<div className="flex">
					<Image h={50} src="/logo_dark.svg" alt="partitura logo" />
					<Title order={1}>Partitura</Title>
				</div>
				<Group gap={5} visibleFrom="md">
					{items}
					<TextInput
						className={classes.search}
						placeholder="Search songs"
						visibleFrom="lg"
						onChange={(event) =>
							setValue(event.currentTarget.value)
						}
					/>
				</Group>

				<Burger
					opened={opened}
					onClick={toggle}
					hiddenFrom="xs"
					size="sm"
				/>
			</Container>
		</header>
	);
}

export default Header;
