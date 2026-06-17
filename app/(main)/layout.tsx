import "./globals.css";
import "./layout.css";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <nav className="NavigationMenu">
                <div className="NavigationMenuLeftWrapper">
                    <h1 className="NavigationMenuLogo">HappShop</h1>
                    <button className="NavigationMenuCategory">
                        <svg
                            className="NavigationMenuCategoryIcon"
                            viewBox="0 0 24 24"
                            xmlns="http://w3.org"
                        >
                            <line x1="1" y1="5" x2="20" y2="5" />
                            <line x1="1" y1="12" x2="20" y2="12" />
                            <line x1="1" y1="19" x2="20" y2="19" />
                        </svg>
                        Категории
                    </button>

                    <div className="NavigationMenuSearch">
                        <svg className="NavigationMenuSearchIcon"
                            xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            className="NavigationMenuSearchInput"
                            placeholder="Введите текст..."
                        />
                    </div>
                </div>

                <a className="NavigationMenuAuthButton">
                    Войти
                </a>

            </nav>
            { children }
        </>
    );
}
