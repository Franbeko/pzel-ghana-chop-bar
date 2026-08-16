import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks, styles } from '../assets/dummyadmin'
import { MdRestaurant } from "react-icons/md";
import { FiMenu, FiX, FiLogOut } from "react-icons/fi";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        // Clear admin domain storage
        localStorage.removeItem('authToken');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('user');
        localStorage.removeItem('loginData');
        
        // Redirect to customer homepage with a flag to clear storage
        // The customer site will detect this flag and clear its storage
        window.location.href = 'http://localhost:5173?clearAuth=true';
    };

    return (
        <nav className={styles.navWrapper}>
            <div className={styles.navContainer}>
                <div className={styles.logoSection}>
                    <MdRestaurant className={styles.logoIcon} />
                    <span className={styles.logoText}>P-ZEL Admin</span>
                </div>

                <button onClick={() => setMenuOpen(!menuOpen)} className={styles.menuButton}>
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                <div className={styles.desktopMenu}>
                    {navLinks.map(link => (
                        <NavLink 
                            key={link.name} 
                            to={link.href} 
                            className={({ isActive }) => 
                                `${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`
                            }
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                    
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500 transition-all ml-4"
                    >
                        <FiLogOut className="text-lg" />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className={styles.mobileMenu}>
                    {navLinks.map(link => (
                        <NavLink 
                            key={link.name} 
                            to={link.href} 
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) => 
                                `${styles.navLinkBase} ${isActive ? styles.navLinkActive : styles.navLinkInactive}`
                            }
                        >
                            {link.icon}
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                    
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-red-500/30 text-red-400 hover:bg-red-500/20 w-full justify-center mt-2"
                    >
                        <FiLogOut className="text-lg" />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </nav>
    )
}

export default Navbar