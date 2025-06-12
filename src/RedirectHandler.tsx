import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

interface RedirectResponse {
  url: string;
}

function RedirectHandler() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function fetchAndRedirect() {
      if (!id) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/get/${id}`);
        if (!res.ok) {
          throw new Error("URL no encontrada");
        }

        const data: RedirectResponse = await res.json();
        window.location.href = data.url;
      } catch (err) {
        console.error("Error al redirigir:", err);
      }
    }

    fetchAndRedirect();
  }, [id]);

  return <p>Redireccionando...</p>;
}

export default RedirectHandler;