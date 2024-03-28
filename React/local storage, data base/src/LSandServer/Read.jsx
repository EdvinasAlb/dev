import { Show } from "../Show";

export default function Read({ bills, setDeleteData, setEditdata }) {
  let sortedBills;

  sortedBills = bills
    .slice()
    .sort((a, b) => a.billSurname.localeCompare(b.billSurname));

  return (
    <ul className="read-ul">
      {sortedBills.map((bill) => (
        <li className="read-ul--li" key={bill.id}>
          <Show
            bill={bill}
            setDeleteData={setDeleteData}
            setEditdata={setEditdata}
          />
        </li>
      ))}
    </ul>
  );
}
