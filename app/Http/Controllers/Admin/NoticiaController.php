<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Noticia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class NoticiaController extends Controller
{
    /**
     * Muestra las noticias y comunicados oficiales del club (RF28, SPECS 6.4).
     */
    public function index(): Response
    {
        $noticias = Noticia::with('user:id,nombre,apellido')
            ->latest('fecha_publicacion')
            ->paginate(15);

        return Inertia::render('Admin/Noticias/Index', [
            'noticias' => $noticias,
        ]);
    }

    /**
     * Formulario de redacción de comunicado oficial.
     */
    public function create(): Response
    {
        return Inertia::render('Admin/Noticias/Create');
    }

    /**
     * Guarda y publica una nueva noticia (RF28).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'titulo' => ['required', 'string', 'max:200'],
            'contenido' => ['required', 'string'],
            'fecha_publicacion' => ['required', 'date'],
            'publicada' => ['boolean'],
            'imagen' => ['nullable', 'image', 'max:2048'],
        ]);

        $imagenPath = null;
        if ($request->hasFile('imagen')) {
            $imagenPath = $request->file('imagen')->store('noticias', 'public');
        }

        $slugBase = Str::slug($validated['titulo']);
        $slug = $slugBase;
        $counter = 1;
        while (Noticia::where('slug', $slug)->exists()) {
            $slug = "{$slugBase}-{$counter}";
            $counter++;
        }

        Noticia::create([
            'user_id' => $request->user()->id,
            'titulo' => $validated['titulo'],
            'slug' => $slug,
            'contenido' => $validated['contenido'],
            'imagen_portada' => $imagenPath,
            'publicada' => $validated['publicada'] ?? true,
            'fecha_publicacion' => $validated['fecha_publicacion'],
        ]);

        return redirect()->route('admin.noticias.index')->with('success', "Comunicado '{$validated['titulo']}' publicado.");
    }

    /**
     * Formulario de edición de noticia.
     */
    public function edit(Noticia $noticia): Response
    {
        return Inertia::render('Admin/Noticias/Edit', [
            'noticia' => $noticia,
        ]);
    }

    /**
     * Actualiza un comunicado oficial existente (RF28).
     */
    public function update(Request $request, Noticia $noticia): RedirectResponse
    {
        $validated = $request->validate([
            'titulo' => ['required', 'string', 'max:200'],
            'contenido' => ['required', 'string'],
            'fecha_publicacion' => ['required', 'date'],
            'publicada' => ['boolean'],
            'imagen' => ['nullable', 'image', 'max:2048'],
        ]);

        $imagenPath = $noticia->imagen_portada;
        if ($request->hasFile('imagen')) {
            if ($imagenPath && Storage::disk('public')->exists($imagenPath)) {
                Storage::disk('public')->delete($imagenPath);
            }
            $imagenPath = $request->file('imagen')->store('noticias', 'public');
        }

        // Si cambió el título, actualizamos el slug
        $slug = $noticia->slug;
        if ($noticia->titulo !== $validated['titulo']) {
            $slugBase = Str::slug($validated['titulo']);
            $slug = $slugBase;
            $counter = 1;
            while (Noticia::where('slug', $slug)->where('id', '!=', $noticia->id)->exists()) {
                $slug = "{$slugBase}-{$counter}";
                $counter++;
            }
        }

        $noticia->update([
            'titulo' => $validated['titulo'],
            'slug' => $slug,
            'contenido' => $validated['contenido'],
            'imagen_portada' => $imagenPath,
            'publicada' => $validated['publicada'] ?? $noticia->publicada,
            'fecha_publicacion' => $validated['fecha_publicacion'],
        ]);

        return redirect()->route('admin.noticias.index')->with('success', "Comunicado '{$noticia->titulo}' actualizado.");
    }

    /**
     * Elimina un comunicado oficial.
     */
    public function destroy(Noticia $noticia): RedirectResponse
    {
        if ($noticia->imagen_portada && Storage::disk('public')->exists($noticia->imagen_portada)) {
            Storage::disk('public')->delete($noticia->imagen_portada);
        }

        $noticia->delete();

        return back()->with('success', "Comunicado eliminado.");
    }
}
