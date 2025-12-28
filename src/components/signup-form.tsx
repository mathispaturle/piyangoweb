"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checkingSession, setCheckingSession] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  // Si el registro viene de un link con ?ref=xxxx
  const referrer_id = searchParams.get("ref") || null;

  // Detectar si ya hay sesión activa
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/"); // Redirige si ya logeado
      } else {
        setCheckingSession(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const generateUniqueReferralCode = async (length = 6): Promise<string> => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i = 0; i < 5; i++) { // max 5 attempts
      const code = Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      const querySnap = await getDocs(query(collection(db, 'users'), where('referralCode', '==', code)));

      if (querySnap.empty) {
        return code; // it's unique
      }
    }

    throw new Error('Failed to generate unique referral code');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== repeatPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      // Crear documento de usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString(),
        fullname: null,
        phone: null,
        birthdate: null,
        id_doc: null,
        profile_pic: null,
        referralCode: await generateUniqueReferralCode(),
        referredBy: referrer_id,
        referralStats: { invited: 0, completed: 0, rewardCredits: 0 },
      });

      await axios.post("/api/resend?email_type=welcome&lang=es&email_to=" + user.email, {
        "email_type": "welcome",
        "lang": "es",
        "email_to": user.email
      })

      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError("Error al crear la cuenta. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingSession) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Crea tu cuenta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Introduce tus credenciales para crear tu cuenta de Piyango.
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Correo</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Contraseña</Label>
          <div className="flex gap-2">
            <Input
              id="password"
              type={showPassword ? 'text' : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant={'secondary'} onClick={(e) => {
              e.preventDefault()
              setShowPassword(!showPassword)
            }}>
              {
                showPassword ? <EyeClosed /> : <Eye />
              }

            </Button>
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="repeatPassword">Repite contraseña</Label>
          <div className="flex gap-2">
            <Input
              id="repeatPassword"
              type={showPassword ? 'text' : "password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <Button variant={'secondary'} onClick={(e) => {
              e.preventDefault()
              setShowPassword(!showPassword)
            }}>
              {
                showPassword ? <EyeClosed /> : <Eye />
              }

            </Button>
          </div>
        </div>

        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </div>
      <div className="text-center text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link href={"/login"} className="underline underline-offset-4">
          Accede a tu cuenta
        </Link>
      </div>
    </form>
  );
}
