"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "sonner";

import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
/* -----------------------------
   SCHEMA
------------------------------ */
export const schema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string().optional(),
  available: z.boolean().optional(),
  sortOrder: z.number().optional(),
  price_ticket: z.number().optional(),
  sold_tickets: z.number().optional(),
  total_tickets: z.number().optional(),
  draw_date: z.string().optional(),
});

type Raffle = z.infer<typeof schema>;

/* -----------------------------
   COMPONENTE PRINCIPAL
------------------------------ */
export default function RafflesTable() {
  const [data, setData] = React.useState<Raffle[]>([]);
  const [isSaving, setIsSaving] = React.useState(false);

  /* -----------------------------
      LOAD DATA
  ------------------------------ */
  React.useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, "raffles"));
        const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Raffle[];

        // Ordenar: available primero, luego sortOrder asc
        rows.sort((a, b) => {
          if (a.available && !b.available) return -1;
          if (!a.available && b.available) return 1;
          return (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);
        });

        setData(rows);
      } catch (err) {
        console.error(err);
        toast.error("Error al cargar las rifas");
      }
    };

    load();
  }, []);

  /* -----------------------------
      DRAG & DROP HANDLER
  ------------------------------ */
  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const newData = Array.from(data);
    const [moved] = newData.splice(result.source.index, 1);
    newData.splice(result.destination.index, 0, moved);

    // Recalcular sortOrder
    const updated = newData.map((item, idx) => ({ ...item, sortOrder: idx }));
    setData(updated);

    // Actualizar Firestore
    try {
      setIsSaving(true);
      const batch = writeBatch(db);
      updated.forEach((item) => {
        const ref = doc(db, "raffles", item.id);
        batch.update(ref, { sortOrder: item.sortOrder });
      });
      await batch.commit();
      toast.success("Orden actualizado");
    } catch (err) {
      console.error(err);
      toast.error("Error guardando el orden");
    } finally {
      setIsSaving(false);
    }
  };

  const router = useRouter()
  /* -----------------------------
      RENDER
  ------------------------------ */
  return (
    <Tabs defaultValue="raffles" className="w-full flex-col gap-6">
      <TabsContent value="raffles" className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="raffles-table">
              {(provided) => (
                <Table ref={provided.innerRef} {...provided.droppableProps}>
                  <TableHeader className="bg-muted sticky top-0 z-10">
                    <TableRow>
                      <TableHead>Título</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Tickets</TableHead>
                      <TableHead>Disponible</TableHead>
                      <TableHead className="text-right">Precio Ticket</TableHead>
                      <TableHead className="text-right">Fecha sorteo</TableHead>
                      <TableHead className="text-right">Acción</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {data.length ? (
                      data.map((r, index) => (
                        <Draggable key={r.id} draggableId={r.id} index={index}>
                          {(providedDrag) => (
                            <TableRow
                              ref={providedDrag.innerRef}
                              {...providedDrag.draggableProps}
                              {...providedDrag.dragHandleProps}
                              className="border-b hover:bg-gray-50 transition cursor-move"
                            >
                              <TableCell>{r.title}</TableCell>
                              <TableCell>{r.category ?? "-"}</TableCell>
                              <TableCell>{r.sold_tickets ?? 0}/{r.total_tickets ?? 0}</TableCell>
                              <TableCell>
                                {r.available != false ? (
                                  <span className="text-green-600 font-semibold">Sí</span>
                                ) : (
                                  <span className="text-red-600 font-semibold">No</span>
                                )}
                              </TableCell>
                              <TableCell className="text-right">
                                {r.price_ticket?.toLocaleString("de-DE", { minimumFractionDigits: 2 }) ?? "-"} €
                              </TableCell>
                              <TableCell className="text-right">
                                {r.draw_date
                                  ? new Date(r.draw_date).toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" })
                                  : "-"}
                              </TableCell>
                              <TableCell className="text-right">
                                <Button onClick={() => { router.push("/admin/dashboard/raffle/" + r.id) }} className="cursor-pointer" variant={'secondary'} size={'sm'} >Editar</Button>
                                <Button onClick={() => { router.push("/admin/dashboard/raffle/" + r.id + "/sold") }} className="cursor-pointer ml-2" variant={'secondary'} size={'sm'} >Vendidos</Button>
                              </TableCell>
                            </TableRow>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No hay rifas.
                        </TableCell>
                      </TableRow>
                    )}
                    {provided.placeholder}
                  </TableBody>
                </Table>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="flex items-center justify-end">
          {isSaving && (
            <Button variant="ghost" disabled>
              Guardando...
            </Button>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
