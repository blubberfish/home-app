export type PageLayoutChildren = {
    hero: {
        actions: ({ label: string, callback: () => void })[]
    }
}

export type PageLayoutProps = {
    children?: PageLayoutChildren
}

export const PageLayout = ({ children }: PageLayoutProps) => {
    const { hero } = children ?? {}
    return <div>
        {hero && (
            <header>
                <nav>
                    {hero.actions.map((action, i) => <button>{action.label}</button>)}
                </nav>
            </header>
        )}
    </div>
} 