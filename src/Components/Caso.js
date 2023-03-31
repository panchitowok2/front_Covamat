export default function caso({caso}) {
    return (
        <tr>
            <td>{caso._id}</td>
            <td>{caso.name}</td>
        </tr>
    );
}