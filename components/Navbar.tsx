import { getNavTree } from "@/lib/queries";
import NavbarClient from "@/components/NavbarClient";

const Navbar = async () => {
    const navItems = await getNavTree();
    return <NavbarClient navItems={navItems} />;
};

export default Navbar;
