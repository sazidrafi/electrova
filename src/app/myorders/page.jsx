"use client";

import { Chip, Table } from "@heroui/react";
import { Box, CircleFill } from "@gravity-ui/icons";
import { useEffect, useState } from "react";
import { authClient } from "../lib/auth-client";

const statusColors = {
  pending: "warning",
  processing: "default",
  delivered: "success",
  cancelled: "danger",
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data, isPending } = authClient.useSession();
  const userid = data?.user?.id;

  useEffect(() => {
    if (isPending || !userid) return;

    let ignore = false;

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/orders/${userid}`,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const result = await res.json();

        if (!ignore) {
          setOrders(Array.isArray(result.orders) ? result.orders : []);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);

        if (!ignore) {
          setOrders([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      ignore = true;
    };
  }, [userid, isPending]);

  if (isPending || (userid && loading)) {
    return <p className="py-10 text-center">Loading orders...</p>;
  }

  if (!userid) {
    return (
      <p className="py-10 text-center text-gray-500">
        Please log in to view your orders.
      </p>
    );
  }

  return (
    <div className="container mx-auto mt-6 sm:mt-10 mb-10 px-4 sm:px-6 lg:px-8 ">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          My <span className="text-blue-800">Orders</span>
        </h1>

        <h2 className="text-lg sm:text-2xl text-gray-400">{orders.length}</h2>
      </div>

      <div className="border-b-2 border-gray-200 dark:border-gray-700 mt-5 mb-5" />

      {orders.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-gray-500">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-700 dark:bg-gray-800">
            <Box width={30} height={30} />
          </div>
          <p>You have not placed any order yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="My orders" className="min-w-225">
                <Table.Header>
                  <Table.Column isRowHeader>Order</Table.Column>
                  <Table.Column>Products</Table.Column>
                  <Table.Column>Address</Table.Column>
                  <Table.Column>
                    <div className="text-right">Total</div>
                  </Table.Column>
                  <Table.Column>Payment</Table.Column>
                  <Table.Column>Status</Table.Column>
                </Table.Header>

                <Table.Body>
                  {orders.map((order) => {
                    const totalCount = order.items.reduce(
                      (sum, item) => sum + Number(item.quantity),
                      0,
                    );

                    const isPaid = order.status === "delivered";

                    return (
                      <Table.Row key={order._id}>
                        <Table.Cell>
                          <p className="font-medium">
                            #{order._id.slice(-6).toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="space-y-1">
                            {order.items.map((item) => (
                              <p key={item._id} className="text-sm">
                                {item.productName}{" "}
                                <span className="text-gray-500">
                                  × {item.quantity}
                                </span>
                              </p>
                            ))}
                            <p className="text-xs font-medium text-blue-400">
                              Total {totalCount} item{totalCount > 1 ? "s" : ""}
                            </p>
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <p className="text-sm">{order.customer.address}</p>
                          <p className="text-xs text-gray-500">
                            {order.customer.district}
                          </p>
                        </Table.Cell>

                        <Table.Cell>
                          <div className="text-right font-semibold">
                            ৳{Number(order.total).toFixed(2)}
                          </div>
                        </Table.Cell>

                        <Table.Cell>
                          <p className="text-sm">
                            {order.paymentMethod === "cod"
                              ? "Cash on Delivery"
                              : order.paymentMethod}
                          </p>
                          <Chip
                            color={isPaid ? "success" : "default"}
                            variant="primary"
                            className="mt-1"
                          >
                            <CircleFill width={6} />
                            <Chip.Label>
                              {isPaid ? "Paid" : "Unpaid"}
                            </Chip.Label>
                          </Chip>
                        </Table.Cell>

                        <Table.Cell>
                          <Chip
                            color={statusColors[order.status] || "default"}
                            variant="primary"
                          >
                            <CircleFill width={6} />
                            <Chip.Label className="capitalize">
                              {order.status}
                            </Chip.Label>
                          </Chip>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
