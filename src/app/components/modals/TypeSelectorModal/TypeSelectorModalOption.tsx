interface OptionButtonProps {
    onClick: () => void
    icon: React.ReactNode
    label: string
    bg: string
    bgHover: string
}

const OptionButton: React.FC<OptionButtonProps> = ({ onClick, icon, label, bg, bgHover }) => (
    <button
        onClick={onClick}
        className="modal-btn flex items-center w-full"
        style={{
            '--modal-btn-bg': bg,
            '--modal-btn-bg-hover': bgHover,
            '--modal-btn-text': '#ffffff'
        } as React.CSSProperties}
    >
        {icon}
        <span className="ml-3">{label}</span>
    </button>
)

export default OptionButton
