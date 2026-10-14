<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Insumo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InsumoController extends Controller
{
    /**
     * Muestra el inventario de armería, municiones y blancos (RF11, SPECS 6.4).
     */
    public function index(Request $request): Response
    {
        $categoria = $request->input('categoria');
        $busqueda = $request->input('q');

        $insumos = Insumo::query()
            ->when($categoria, fn ($q) => $q->where('categoria', $categoria))
            ->when($busqueda, fn ($q) => $q->where('nombre', 'like', "%{$busqueda}%"))
            ->orderBy('nombre', 'asc')
            ->paginate(20)
            ->withQueryString();

        $alertaStockBajo = Insumo::whereRaw('cantidad_stock <= stock_minimo')->count();

        return Inertia::render('Admin/Insumos/Index', [
            'insumos' => $insumos,
            'filtros' => [
                'categoria' => $categoria,
                'q' => $busqueda,
            ],
            'alertaStockBajo' => $alertaStockBajo,
        ]);
    }

    /**
     * Registra un nuevo ítem en el inventario de armería (RF11).
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:150'],
            'categoria' => ['required', 'string', 'max:80'],
            'cantidad_stock' => ['required', 'integer', 'min:0'],
            'stock_minimo' => ['required', 'integer', 'min:0'],
            'precio_unitario' => ['required', 'numeric', 'min:0'],
        ]);

        Insumo::create($validated);

        return back()->with('success', "Insumo '{$validated['nombre']}' registrado en el inventario.");
    }

    /**
     * Actualiza información o precios de un insumo (RF11).
     */
    public function update(Request $request, Insumo $insumo): RedirectResponse
    {
        $validated = $request->validate([
            'nombre' => ['required', 'string', 'max:150'],
            'categoria' => ['required', 'string', 'max:80'],
            'cantidad_stock' => ['required', 'integer', 'min:0'],
            'stock_minimo' => ['required', 'integer', 'min:0'],
            'precio_unitario' => ['required', 'numeric', 'min:0'],
        ]);

        $insumo->update($validated);

        return back()->with('success', "Insumo '{$insumo->nombre}' actualizado correctamente.");
    }

    /**
     * Ajuste rápido de existencias (ingreso o egreso de stock en armería).
     */
    public function ajustarStock(Request $request, Insumo $insumo): RedirectResponse
    {
        $validated = $request->validate([
            'cantidad' => ['required', 'integer'],
            'motivo' => ['nullable', 'string', 'max:255'],
        ]);

        $nuevaCantidad = $insumo->cantidad_stock + $validated['cantidad'];
        if ($nuevaCantidad < 0) {
            return back()->with('error', 'El stock no puede quedar con valor negativo.');
        }

        $insumo->update(['cantidad_stock' => $nuevaCantidad]);

        return back()->with('success', "Stock de '{$insumo->nombre}' ajustado a {$nuevaCantidad} unidades.");
    }

    /**
     * Elimina un insumo del catálogo.
     */
    public function destroy(Insumo $insumo): RedirectResponse
    {
        $insumo->delete();

        return back()->with('success', "Insumo '{$insumo->nombre}' eliminado del inventario.");
    }
}
