"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { auth, db } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import moment from "moment"


interface WalletTransaction {
  id: string
  amount: number
  currency: string
  status: string
  createdAt: any 
  type: string
  raffleId?: string
  paymentId?: string
}

export default function WalletTransactions() {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([])
  const [loading, setLoading] = useState(true)

  moment.locale("es")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const q = query(
          collection(db, "users", user.uid, "walletTransactions"),
          where("status", "==", "COMPLETED")
        )
        const querySnapshot = await getDocs(q)

        const txs: WalletTransaction[] = []
        querySnapshot.forEach((doc) => {
          txs.push({ id: doc.id, ...doc.data() } as WalletTransaction)
        })

        // sort newest first
        txs.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))

        setTransactions(txs)
      } else {
        setTransactions([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto py-12 px-4">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Transacciones completadas</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center">Cargando transacciones...</p>
            ) : transactions.length === 0 ? (
              <p className="text-center">No se han encontrado transacciones.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Referencia</TableHead>
                    <TableHead className='text-right'>Cantidad</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell>{moment(tx.createdAt.seconds).format("LLL")}</TableCell>
                      <TableCell>{tx.type}</TableCell>
                      <TableCell>{tx.paymentId || tx.raffleId || "-"}</TableCell>
                      <TableCell className='text-right'>
                        {(tx.amount/100).toFixed(2)}€
                      </TableCell>
                      <TableCell className="text-green-600 font-semibold">
                        {tx.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </>
  )
}
