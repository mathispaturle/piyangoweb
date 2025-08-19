'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../../../lib/firebase'

export default function CreateRaffleForm() {
  const [images, setImages] = useState<string[]>([''])
  const [characteristics, setCharacteristics] = useState<{ key: string; value: string }[]>([
    { key: '', value: '' },
  ])
  const router = useRouter()

  const addImageField = () => setImages([...images, ''])
  const updateImage = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    setImages(newImages)
  }

  const addCharacteristic = () =>
    setCharacteristics([...characteristics, { key: '', value: '' }])

  const updateCharacteristic = (
    index: number,
    field: 'key' | 'value',
    value: string
  ) => {
    const newChars = [...characteristics]
    newChars[index][field] = value
    setCharacteristics(newChars)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)

    const raffle = {
      title: formData.get('title'),
      description: formData.get('description'),
      category: formData.get('category'),
      draw_date: formData.get('draw_date'),
      price_ticket: Number(formData.get('price_ticket')),
      total_tickets: Number(formData.get('total_tickets')),
      sponsor_name: formData.get('sponsor_name'),
      sponsor_store_direction: formData.get('sponsor_store_direction'),
      sponsor_image: formData.get('sponsor_image'),
      images: images.filter((img) => img.trim() !== ''),
      product_characteristics: Object.fromEntries(
        characteristics
          .filter((c) => c.key.trim() !== '' && c.value.trim() !== '')
          .map((c) => [c.key, c.value])
      ),
    }

    console.log('New raffle:', raffle)

    // TODO: send raffle to Firestore
    try {
      const docRef = await addDoc(collection(db, "raffles"), raffle)
      console.log("Raffle created with ID:", docRef.id)
      alert("Raffle created successfully!")
      // opcional: redirigir a otra página
      // router.push("/admin/raffles")
    } catch (error) {
      console.error("Error adding raffle:", error)
      alert("Error creating raffle. Check console.")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow"
    >
      <h2 className="text-xl font-semibold text-gray-900">Create New Raffle</h2>

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" required />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" required />
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input id="category" name="category" required />
      </div>

      {/* Draw date */}
      <div className="space-y-2">
        <Label htmlFor="draw_date">Draw Date</Label>
        <Input id="draw_date" name="draw_date" type="datetime-local" required />
      </div>

      {/* Ticket price */}
      <div className="space-y-2">
        <Label htmlFor="price_ticket">Ticket Price (€)</Label>
        <Input id="price_ticket" name="price_ticket" type="number" required />
      </div>

      {/* Total tickets */}
      <div className="space-y-2">
        <Label htmlFor="total_tickets">Total Tickets</Label>
        <Input id="total_tickets" name="total_tickets" type="number" required />
      </div>

      {/* Sponsor */}
      <div className="space-y-2">
        <Label htmlFor="sponsor_name">Sponsor Name</Label>
        <Input id="sponsor_name" name="sponsor_name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sponsor_store_direction">Sponsor Store Direction</Label>
        <Input id="sponsor_store_direction" name="sponsor_store_direction" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sponsor_image">Sponsor Logo (URL)</Label>
        <Input id="sponsor_image" name="sponsor_image" />
      </div>

      {/* Images */}
      <div className="space-y-2">
        <Label>Images (URLs)</Label>
        {images.map((img, i) => (
          <Input
            key={i}
            value={img}
            onChange={(e) => updateImage(i, e.target.value)}
            placeholder={`Image URL ${i + 1}`}
          />
        ))}
        <Button type="button" variant="outline" onClick={addImageField}>
          + Add another image
        </Button>
      </div>

      {/* Product Characteristics (Map) */}
      <div className="space-y-2">
        <Label>Product Characteristics</Label>
        {characteristics.map((c, i) => (
          <div key={i} className="flex gap-2">
            <Input
              placeholder="Key (e.g. engine)"
              value={c.key}
              onChange={(e) => updateCharacteristic(i, 'key', e.target.value)}
            />
            <Input
              placeholder="Value (e.g. 125 cc)"
              value={c.value}
              onChange={(e) => updateCharacteristic(i, 'value', e.target.value)}
            />
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addCharacteristic}>
          + Add another characteristic
        </Button>
      </div>

      <Button type="submit" className="w-full">
        Create Raffle
      </Button>
    </form>
  )
}
