import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NotificationCard from "../components/NotificationCard";
import { getNotifications } from "../api/notificationApi";

function NotificationsPage() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function loadData() {

            try {

                const data = await getNotifications();

                setNotifications(data);

            } catch (err) {

                console.log(err);

            } finally {

                setLoading(false);

            }

        }

        loadData();

    }, []);

    return (

        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "900px",
                    margin: "30px auto",
                    padding: "20px"
                }}
            >

                <h1>All Notifications</h1>

                {loading && <h3>Loading...</h3>}

                {!loading && notifications.length === 0 && (
                    <h3>No Notifications Found</h3>
                )}

                {!loading &&
                    notifications.map((item) => (

                        <NotificationCard
                            key={item.ID}
                            notification={item}
                        />

                    ))
                }

            </div>

        </>

    );

}

export default NotificationsPage;