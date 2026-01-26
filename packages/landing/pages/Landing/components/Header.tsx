interface HeaderProps {
    children: React.ReactNode
}

const Header: React.FC<HeaderProps> = ({ children }) => {
    return (
        <header style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '4rem',
        }}>
            {children}
        </header>
    )
}

export default Header
