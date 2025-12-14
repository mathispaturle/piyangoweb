'use client';

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";


export function SectionCards() {
  const [activeRaffles, setActiveRaffles] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [totalTicketsSold, setTotalTicketsSold] = useState(0);
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        // --- RAFFLES ---
        const rafflesSnap = await getDocs(collection(db, "raffles"));

        let active = 0;
        let ticketsSold = 0;
        let salesAmount = 0;

        rafflesSnap.forEach((doc) => {
          const r = doc.data();

          // Sorteos activos
          if (r.available != false) active++;

          const sold = r.sold_tickets ?? 0;
          const price = r.price_ticket ?? 0;

          ticketsSold += sold;
          salesAmount += sold * price;
        });

        setActiveRaffles(active);
        setTotalTicketsSold(ticketsSold);
        setTotalSalesAmount(salesAmount);

        // --- USERS ---
        const usersSnap = await getDocs(collection(db, "users"));
        setUsersCount(usersSnap.size);

      } catch (error) {
        console.error("Error loading dashboard stats:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

      {/* Sorteos activos */}
      <Card>
        <CardHeader>
          <CardDescription>Total Sorteos Activos</CardDescription>
          <CardTitle className="text-3xl font-semibold">
            {activeRaffles}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Usuarios */}
      <Card>
        <CardHeader>
          <CardDescription>Usuarios</CardDescription>
          <CardTitle className="text-3xl font-semibold">
            {usersCount}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Boletos comprados */}
      <Card>
        <CardHeader>
          <CardDescription>Boletos Comprados</CardDescription>
          <CardTitle className="text-3xl font-semibold">
            {totalTicketsSold}
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Valor total vendido */}
      <Card>
        <CardHeader>
          <CardDescription>Valor Boletos Vendidos</CardDescription>
          <CardTitle className="text-3xl font-semibold">
            € {totalSalesAmount.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
          </CardTitle>
        </CardHeader>
      </Card>

    </div>
  );
}
