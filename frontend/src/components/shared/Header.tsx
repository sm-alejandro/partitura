import {
	Burger,
	Container,
	Group,
	Image,
	Tabs,
	TextInput,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./HeaderSearch.module.css";

const links = [
	{ link: "/songs", label: "Songs" },
	{ link: "/authors", label: "Authors" },
	{ link: "/categories", label: "Categories" },
	{ link: "/playlists", label: "Playlists" },
];

function clearPathname(pathname: string) {
	return pathname.split("/").slice(0, 2).join("/");
}

function Header() {
	const navigate = useNavigate();
	let location = useLocation();

	const setValue = (query: string) => {
		setActive("/songs");
		navigate(`/songs?query=${encodeURIComponent(query.trim())}`);
	};

	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(clearPathname(location.pathname));

	useEffect(() => {
		setActive(clearPathname(location.pathname));
	}, [location]);

	return (
		<header className={classes.header}>
			<Container size="xl" className={classes.inner}>
				<div className="flex items-center">
					<Image h={50} src="/logo_dark.svg" alt="partitura logo" />
					<Title order={1}>Partitura</Title>
				</div>
				<Group gap={5} visibleFrom="md">
					<Tabs
						value={active}
						onChange={(link) => {
							if (!link) return;
							setActive(link);
							navigate(`${link}`);
						}}
					>
						<Tabs.List>
							{links.map((link) => (
								<Tabs.Tab
									data-active={
										active === link.link || undefined
									}
									key={link.link}
									value={link.link}
								>
									{link.label}
								</Tabs.Tab>
							))}
						</Tabs.List>
					</Tabs>
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
