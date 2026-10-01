import { getNavTree, getTopBarLinks } from "@/lib/queries";
import NavbarClient from "@/components/NavbarClient";

const Navbar = async () => {
    const [navItems, topBarLinks] = await Promise.all([getNavTree(), getTopBarLinks()]);
    return <NavbarClient navItems={navItems} topBarLinks={topBarLinks} />;
};

export default Navbar;
