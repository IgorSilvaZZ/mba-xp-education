export default async function Variables() {
    return (
        <>
            <div>
                Variables:
                <br />
                <p>{process.env.DB_HOST}</p>
                <p>{process.env.NEXT_PUBLIC_URL}</p>
            </div>
        </>
    )
}