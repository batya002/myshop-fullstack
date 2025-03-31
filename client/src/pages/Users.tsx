import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");

      if (response.status == 404) {
        throw new Error("");
      }

      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section>
      <div className="container max-w-section">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Password</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map((user, index) => {
							const { name, email, password } = user
							return(
								<TableRow key={index}>
									<TableCell>{name}</TableCell>
									<TableCell>{email}</TableCell>
									<TableCell>{password}</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</div>
    </section>
  );
}
