import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsPostcard } from "react-icons/bs";
import { IoHome, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RiShoppingCartLine } from "react-icons/ri";
import { GrGallery } from "react-icons/gr";
import { TiContacts } from "react-icons/ti";


export default function Aside() {

        const router = useRouter();
        const [clicked, setClicked] = useState(false);
        const [activeLink, setActiveLink] = useState('/');

        const handleClick = () => {
                setClicked(!clicked);
        }

        const handleLinkClick = (link) => {
                setActiveLink(preActive => (preActive === link ? null : link))
                setClicked(false)
        }

        useEffect(() => {
                // Update an active link state when the page is reloaded
                setActiveLink(router.pathname);
        }, [router.pathname])


        return <>
                <aside className="asideleft active">
                        <ul>
                                <Link href='/'>
                                        <li className="navactive">
                                                <IoHome />
                                                <span>Dashboard</span>
                                        </li>
                                </Link>
                                <li className={activeLink === '/blogs' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/blogs')}>
                                        <div className="flex gap-1">
                                                <BsPostcard />
                                                <span>Blogs</span>
                                        </div>
                                        {activeLink === '/blogs' && (
                                                <ul>
                                                        <Link href='/blogs'><li>All Blogs</li></Link>
                                                        <Link href='/blogs'><li>All Blogs</li></Link>
                                                        <Link href='/blogs/draft'><li>Draft Blogs</li></Link>
                                                        <Link href='/blogs/addblog'><li>Add Blog</li></Link>
                                                </ul>
                                        )}
                                </li>

                                <li className={activeLink === '/projects' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/projects')}>
                                        <div className="flex gap-1">
                                                <MdOutlineWorkOutline />
                                                <span>Projects</span>
                                        </div>
                                        {activeLink === '/projects' && (
                                                <ul>
                                                        <Link href='/projects'><li>All Projects</li></Link>
                                                        <Link href='/projects/draftprojects'><li>Draft Projects</li></Link>
                                                        <Link href='/projects/addproject'><li>Add Project</li></Link>
                                                </ul>
                                        )}
                                </li>

                                <li className={activeLink === '/shops' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/shops')}>
                                        <div className="flex gap-1">
                                                <RiShoppingCartLine />
                                                <span>Shops</span>
                                        </div>
                                        {activeLink === '/shops' && (
                                                <ul>
                                                        <Link href='/shops'><li>All Products</li></Link>
                                                        <Link href='/shops/draftshop'><li>Draft Product</li></Link>
                                                        <Link href='/shops/addproduct'><li>Add Product</li></Link>
                                                </ul>
                                        )}
                                </li>

                                <li className={activeLink === '/gallery' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/gallery')}>
                                        <div className="flex gap-1">
                                                <GrGallery />
                                                <span>Gallery</span>
                                        </div>
                                        {activeLink === '/gallery' && (
                                                <ul>
                                                        <Link href='/gallery'><li>All Photos</li></Link>
                                                        <Link href='/gallery/addphoto'><li>Add Photo</li></Link>
                                                </ul>
                                        )}
                                </li>

                                <Link href='/contacts'>
                                        <li className={activeLink === '/contacts' ? 'navactive' : ''} onClick={() => handleLinkClick('/contacts')}>
                                                <TiContacts />
                                                <span>Contacts</span>
                                        </li>
                                </Link>

                                <Link href='/setting'>
                                        <li className={activeLink === '/setting' ? 'navactive' : ''} onClick={() => handleLinkClick('/setting')}>
                                                <IoSettingsOutline />
                                                <span>Settings</span>
                                        </li>
                                </Link>
                        </ul>
                </aside>

        </>


}