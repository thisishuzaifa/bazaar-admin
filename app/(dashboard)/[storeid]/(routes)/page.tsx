import prismadb from "@/lib/prismadb"

interface DashboardPageProps {
    params: { storeid: string }
}

const DashboardPage : React.FC<DashboardPageProps> = async ({ params }) => {
    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeid,
        },
    })
    return (
        <>

        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-lg">Welcome to your dashboard</p>

        <div>
            Active Stores: {store?.name}
        </div>

        </>
    )
}

export default DashboardPage;