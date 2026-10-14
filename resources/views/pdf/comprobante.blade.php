<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Comprobante de Pago - {{ $comprobante->codigo_transaccion }}</title>
    <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13px; color: #333; line-height: 1.5; margin: 25px; }
        .header { border-bottom: 2px solid #1e3a8a; padding-bottom: 15px; margin-bottom: 20px; }
        .header h1 { margin: 0; color: #1e3a8a; font-size: 20px; text-transform: uppercase; }
        .header p { margin: 2px 0; color: #666; font-size: 11px; }
        .badge { display: inline-block; padding: 4px 10px; background: #e0e7ff; color: #1e3a8a; font-weight: bold; font-size: 11px; border-radius: 4px; }
        .grid { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
        .grid td { padding: 8px 12px; border: 1px solid #e5e7eb; }
        .grid .label { background-color: #f9fafb; font-weight: bold; width: 30%; color: #4b5563; }
        .total-box { margin-top: 20px; text-align: right; }
        .total-box .total { font-size: 18px; font-weight: bold; color: #1e3a8a; }
        .footer { margin-top: 40px; border-top: 1px dashed #ccc; padding-top: 10px; font-size: 10px; color: #888; text-align: center; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Tiro Federal Formosa</h1>
        <p>Asociación de Tiro y Deportes Afines – Fundado en 1911</p>
        <p>Ruta Nacional N.º 11, Km 1172, Formosa Capital, Argentina</p>
        <p>Personería Jurídica N.º 124/1911 – Entidad de Tiro Afiliada a FAT</p>
    </div>

    <table style="width: 100%; margin-bottom: 15px;">
        <tr>
            <td>
                <strong>RECIBO OFICIAL DE COBRO</strong><br>
                <span class="badge">{{ $comprobante->codigo_transaccion }}</span>
            </td>
            <td style="text-align: right;">
                <strong>Fecha de emisión:</strong> {{ $comprobante->fecha_emision?->format('d/m/Y H:i') }}
            </td>
        </tr>
    </table>

    <table class="grid">
        <tr>
            <td class="label">Socio / Titular:</td>
            <td>{{ $pago->socioProfile?->user?->nombre_completo }}</td>
        </tr>
        <tr>
            <td class="label">N.º de Socio / DNI:</td>
            <td>{{ $pago->socioProfile?->numero_socio ?? 'Tirador Diario' }} — DNI: {{ $pago->socioProfile?->user?->dni }}</td>
        </tr>
        <tr>
            <td class="label">Concepto imputado:</td>
            <td>{{ ucwords(str_replace('_', ' ', $pago->tipo_concepto)) }} {{ $pago->periodo_imputado ? '('.$pago->periodo_imputado.')' : '' }}</td>
        </tr>
        <tr>
            <td class="label">Método de pago:</td>
            <td>{{ ucwords(str_replace('_', ' ', $pago->metodo_pago?->value ?? $pago->metodo_pago)) }}</td>
        </tr>
        <tr>
            <td class="label">Estado de la transacción:</td>
            <td><strong style="color: green;">{{ strtoupper($pago->estado) }}</strong></td>
        </tr>
    </table>

    <div class="total-box">
        <span>IMPORTE TOTAL PERCIBIDO:</span>
        <div class="total">$ {{ number_format($pago->monto, 2, ',', '.') }}</div>
    </div>

    <div class="footer">
        Comprobante emitido digitalmente conforme al sistema de gestión contable de Tiro Federal Formosa.<br>
        Documento válido como constancia formal de pago para uso societario y fiscalización interna.
    </div>
</body>
</html>
