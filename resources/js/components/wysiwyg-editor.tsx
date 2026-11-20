import React, { useRef, useState, useEffect } from 'react';
import {
    RotateCcw, RotateCw, Bold, Italic, Underline,
    List, ListOrdered, Indent, Outdent,
    AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Table, Link2, ImageIcon, RemoveFormatting,
    Palette, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';

interface WysiwygEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    minHeight?: string;
}

export default function WysiwygEditor({
    value,
    onChange,
    placeholder = 'Detalla los beneficios, información relevante o desarrollo de la noticia...',
    minHeight = '320px',
}: WysiwygEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [currentTag, setCurrentTag] = useState<string>('p');
    const [wordCount, setWordCount] = useState<number>(0);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [imageCaption, setImageCaption] = useState('');
    const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');
    const [linkText, setLinkText] = useState('');

    // Sincronizar contenido inicial
    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value || '';
            updateMeta();
        }
    }, [value]);

    const updateMeta = () => {
        if (!editorRef.current) return;
        const text = editorRef.current.innerText || '';
        const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
        setWordCount(words);

        // Detectar tag activo
        const selection = window.getSelection();
        if (selection && selection.anchorNode) {
            let el: HTMLElement | null = selection.anchorNode.parentElement;
            let tag = 'p';
            while (el && el !== editorRef.current) {
                const nodeName = el.nodeName.toLowerCase();
                if (['p', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'ul', 'ol', 'li'].includes(nodeName)) {
                    tag = nodeName;
                    break;
                }
                el = el.parentElement;
            }
            setCurrentTag(tag);
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            const html = editorRef.current.innerHTML;
            onChange(html);
            updateMeta();
        }
    };

    const execCmd = (command: string, val: string | undefined = undefined) => {
        document.execCommand(command, false, val);
        if (editorRef.current) {
            editorRef.current.focus();
            handleInput();
        }
    };

    const handleFormatBlock = (tag: string) => {
        execCmd('formatBlock', tag);
        setCurrentTag(tag.replace(/[<>]/g, ''));
    };

    const handleInsertImage = () => {
        if (!imageUrl) return;
        const figureHtml = `
            <figure class="my-6 block text-center">
                <img src="${imageUrl}" alt="${imageCaption || 'Imagen de la noticia'}" class="w-full max-h-[500px] object-cover rounded-lg shadow-sm mx-auto" />
                ${imageCaption ? `<figcaption class="text-xs text-gray-500 italic mt-2 text-center">${imageCaption}</figcaption>` : ''}
            </figure>
            <p><br></p>
        `;
        execCmd('insertHTML', figureHtml);
        setImageUrl('');
        setImageCaption('');
        setIsImageModalOpen(false);
    };

    const handleInsertLink = () => {
        if (!linkUrl) return;
        if (linkText) {
            const html = `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline font-medium hover:text-blue-800">${linkText}</a>`;
            execCmd('insertHTML', html);
        } else {
            execCmd('createLink', linkUrl);
        }
        setLinkUrl('');
        setLinkText('');
        setIsLinkModalOpen(false);
    };

    const handleInsertTable = () => {
        const tableHtml = `
            <div class="my-4 overflow-x-auto">
                <table class="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Columna 1</th>
                            <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Columna 2</th>
                            <th class="border border-gray-300 px-4 py-2 text-left font-semibold">Columna 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">Dato A1</td>
                            <td class="border border-gray-300 px-4 py-2">Dato B1</td>
                            <td class="border border-gray-300 px-4 py-2">Dato C1</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">Dato A2</td>
                            <td class="border border-gray-300 px-4 py-2">Dato B2</td>
                            <td class="border border-gray-300 px-4 py-2">Dato C2</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><br></p>
        `;
        execCmd('insertHTML', tableHtml);
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-xs focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            {/* Toolbar — Idéntica a la Imagen 1 */}
            <div className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50/70 p-2 text-gray-700 rounded-t-xl select-none">
                {/* Deshacer / Rehacer */}
                <button
                    type="button"
                    title="Deshacer"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('undo'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Rehacer"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('redo'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <RotateCw className="w-4 h-4" />
                </button>

                <div className="h-5 w-[1px] bg-gray-300 mx-1" />

                {/* Dropdown de Bloque (Paragraph, H1, H2, H3, Blockquote) */}
                <select
                    title="Formato de bloque"
                    value={['p', 'h1', 'h2', 'h3', 'blockquote'].includes(currentTag) ? currentTag : 'p'}
                    onChange={(e) => handleFormatBlock(e.target.value)}
                    className="h-8 rounded-md border border-gray-300 bg-white px-2.5 text-xs font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    <option value="p">Párrafo normal</option>
                    <option value="h1">Título 1 (Principal)</option>
                    <option value="h2">Título 2 (Sección)</option>
                    <option value="h3">Título 3 (Subsección)</option>
                    <option value="blockquote">Cita destacada</option>
                </select>

                <div className="h-5 w-[1px] bg-gray-300 mx-1" />

                {/* Formatos de fuente: Negrita, Cursiva, Subrayado */}
                <button
                    type="button"
                    title="Negrita (Ctrl+B)"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('bold'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-800 font-bold transition-colors"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Cursiva (Ctrl+I)"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('italic'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-800 italic transition-colors"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Subrayado (Ctrl+U)"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('underline'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-800 underline transition-colors"
                >
                    <Underline className="w-4 h-4" />
                </button>

                {/* Color de texto rápido */}
                <div className="relative flex items-center">
                    <button
                        type="button"
                        title="Color azul destacado"
                        onMouseDown={(e) => { e.preventDefault(); execCmd('foreColor', '#2563eb'); }}
                        className="p-1.5 rounded-md hover:bg-gray-200 text-blue-600 font-semibold transition-colors"
                    >
                        <span className="text-xs font-bold border-b-2 border-blue-600">A</span>
                    </button>
                    <button
                        type="button"
                        title="Color original (negro)"
                        onMouseDown={(e) => { e.preventDefault(); execCmd('foreColor', '#1f2937'); }}
                        className="p-1.5 rounded-md hover:bg-gray-200 text-gray-900 transition-colors"
                    >
                        <span className="text-xs font-bold border-b-2 border-gray-900">A</span>
                    </button>
                </div>

                <div className="h-5 w-[1px] bg-gray-300 mx-1" />

                {/* Listas y sangrías */}
                <button
                    type="button"
                    title="Lista con viñetas"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('insertUnorderedList'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Lista numerada"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('insertOrderedList'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Reducir sangría"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('outdent'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <Outdent className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Aumentar sangría"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('indent'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <Indent className="w-4 h-4" />
                </button>

                <div className="h-5 w-[1px] bg-gray-300 mx-1" />

                {/* Alineación */}
                <button
                    type="button"
                    title="Alinear a la izquierda"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('justifyLeft'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <AlignLeft className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Centrar"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('justifyCenter'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <AlignCenter className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Alinear a la derecha"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('justifyRight'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <AlignRight className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Justificar"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('justifyFull'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <AlignJustify className="w-4 h-4" />
                </button>

                <div className="h-5 w-[1px] bg-gray-300 mx-1" />

                {/* Insertar Tabla, Imagen, Enlace y Limpiar formato */}
                <button
                    type="button"
                    title="Insertar Tabla"
                    onMouseDown={(e) => { e.preventDefault(); handleInsertTable(); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <Table className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Insertar Imagen con epígrafe"
                    onMouseDown={(e) => { e.preventDefault(); setIsImageModalOpen(true); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <ImageIcon className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Insertar Enlace"
                    onMouseDown={(e) => { e.preventDefault(); setIsLinkModalOpen(true); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <Link2 className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    title="Limpiar formato"
                    onMouseDown={(e) => { e.preventDefault(); execCmd('removeFormat'); }}
                    className="p-1.5 rounded-md hover:bg-gray-200 text-gray-700 transition-colors"
                >
                    <RemoveFormatting className="w-4 h-4" />
                </button>
            </div>

            {/* Área editable tipo WYSIWYG */}
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                onKeyUp={updateMeta}
                onMouseUp={updateMeta}
                style={{ minHeight }}
                data-placeholder={placeholder}
                className="w-full p-4 text-gray-800 focus:outline-none overflow-y-auto font-sans leading-relaxed text-base [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-gray-400 [&:empty]:before:pointer-events-none prose max-w-none [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_blockquote]:border-l-4 [&_blockquote]:border-blue-600 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-3 [&_blockquote]:bg-blue-50/50 [&_blockquote]:py-1.5 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_figure]:my-4"
            />

            {/* Footer con info de estado — Idéntico a la Imagen 1 */}
            <div className="flex items-center justify-between border-t border-gray-100 px-3 py-1.5 text-xs text-gray-500 bg-gray-50/40 rounded-b-xl">
                <span className="font-mono text-[11px] uppercase tracking-wider text-gray-400">
                    {currentTag}
                </span>
                <span className="text-[11px] font-medium text-gray-500">
                    {wordCount} {wordCount === 1 ? 'palabra' : 'palabras'}
                </span>
            </div>

            {/* Modal para insertar imagen con epígrafe */}
            <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insertar Imagen en la Noticia</DialogTitle>
                        <DialogDescription>
                            Podés pegar una URL de imagen y asignarle un epígrafe o pie de foto explicativo.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-2">
                        <div>
                            <Label htmlFor="imgUrl">URL de la Imagen *</Label>
                            <Input
                                id="imgUrl"
                                placeholder="https://ejemplo.com/foto-torneo.jpg"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="imgCap">Epígrafe / Pie de Foto</Label>
                            <Input
                                id="imgCap"
                                placeholder="Ej: Vista del polígono de 25m durante las pruebas finales"
                                value={imageCaption}
                                onChange={(e) => setImageCaption(e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Aparece debajo de la imagen en cursiva, estilo periodístico.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsImageModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleInsertImage} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Insertar Imagen
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Modal para insertar enlace */}
            <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Insertar Enlace</DialogTitle>
                        <DialogDescription>
                            Agregá un hipervínculo a un sitio externo o sección interna.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-2">
                        <div>
                            <Label htmlFor="linkUrlInput">Dirección Web (URL) *</Label>
                            <Input
                                id="linkUrlInput"
                                placeholder="https://..."
                                value={linkUrl}
                                onChange={(e) => setLinkUrl(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="linkTextInput">Texto del Enlace (opcional)</Label>
                            <Input
                                id="linkTextInput"
                                placeholder="Ej: Reglamento oficial ANMaC"
                                value={linkText}
                                onChange={(e) => setLinkText(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsLinkModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleInsertLink} className="bg-blue-600 hover:bg-blue-700 text-white">
                            Insertar Enlace
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
