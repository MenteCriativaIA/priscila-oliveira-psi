"use client";

import { useState, useEffect, useCallback } from "react";
import {
    Check,
    Loader2,
    AlertCircle,
    Copy,
    ClipboardCheck,
    ChevronDown,
    ChevronUp,
    Palette,
    FileText,
    CheckCircle2,
    Lightbulb,
    Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ──────────────────────────────────────────────
   Field Configuration Types & Data
   ────────────────────────────────────────────── */

interface FieldConfig {
    key: string;
    label: string;
    type: "text" | "textarea" | "email" | "tel" | "color" | "select";
    placeholder: string;
    category: string;
    options?: { value: string; label: string }[];
}

// ── Tab: Conteúdo do Site ──
const CONTENT_FIELDS: FieldConfig[] = [
    { key: "nomeCompleto", label: "Nome Completo", type: "text", placeholder: "Ex: Dra. Priscila Oliveira", category: "Dados Pessoais" },
    { key: "crp", label: "CRP", type: "text", placeholder: "Ex: CRP 06/123456", category: "Dados Pessoais" },
    { key: "telefoneWhatsApp", label: "Telefone / WhatsApp", type: "tel", placeholder: "Ex: 5511999999999", category: "Dados Pessoais" },
    { key: "emailProfissional", label: "E-mail Profissional", type: "email", placeholder: "Ex: contato@exemplo.com", category: "Dados Pessoais" },
    { key: "instagram", label: "Instagram (URL)", type: "text", placeholder: "Ex: https://instagram.com/psi.priscila", category: "Dados Pessoais" },
    { key: "linkedin", label: "LinkedIn (URL)", type: "text", placeholder: "Ex: https://linkedin.com/in/priscila-oliveira", category: "Dados Pessoais" },

    { key: "servicos.area1", label: "Área de Atuação 1", type: "text", placeholder: "Ex: Ansiedade", category: "Especialidades" },
    { key: "servicos.frase1", label: "Frase de Ajuda 1", type: "text", placeholder: "Explique como você ajuda nesta área...", category: "Especialidades" },
    { key: "servicos.area2", label: "Área de Atuação 2", type: "text", placeholder: "Ex: Burnout", category: "Especialidades" },
    { key: "servicos.frase2", label: "Frase de Ajuda 2", type: "text", placeholder: "Explique como você ajuda nesta área...", category: "Especialidades" },
    { key: "servicos.area3", label: "Área de Atuação 3", type: "text", placeholder: "Ex: Depressão", category: "Especialidades" },
    { key: "servicos.frase3", label: "Frase de Ajuda 3", type: "text", placeholder: "Explique como você ajuda nesta área...", category: "Especialidades" },
    { key: "servicos.area4", label: "Área de Atuação 4", type: "text", placeholder: "Ex: Stress", category: "Especialidades" },
    { key: "servicos.frase4", label: "Frase de Ajuda 4", type: "text", placeholder: "Explique como você ajuda nesta área...", category: "Especialidades" },
    { key: "servicos.abordagemNome", label: "Nome da sua Abordagem Clínica", type: "text", placeholder: "Ex: Terapia Cognitivo-Comportamental", category: "Especialidades" },
    { key: "servicos.abordagemDescricao", label: "Explicação da Abordagem (leigo)", type: "textarea", placeholder: "Explique em 3 parágrafos simples como funciona sua abordagem...", category: "Especialidades" },

    { key: "investimento.duracaoSessao", label: "Duração Média da Sessão", type: "text", placeholder: "Ex: 50 minutos", category: "Informações Práticas" },
    { key: "investimento.modalidades", label: "Modalidades de Atendimento", type: "text", placeholder: "Ex: Online, Presencial ou Ambos", category: "Informações Práticas" },
    { key: "endereco", label: "Endereço Completo do Consultório", type: "text", placeholder: "Caso atenda presencialmente...", category: "Informações Práticas" },
    { key: "investimento.politicaFaltas", label: "Política de Faltas e Reagendamentos", type: "textarea", placeholder: "Explique como funciona sua política...", category: "Informações Práticas" },
    { key: "investimento.reembolsoConvenio", label: "Emite recibo para reembolso de convênio?", type: "text", placeholder: "Ex: Sim, emito recibo para solicitação de reembolso.", category: "Informações Práticas" },
    { key: "investimento.valorSessao", label: "Valor ou Faixa de Investimento", type: "text", placeholder: "Ex: R$ 250,00 ou sob consulta", category: "Informações Práticas" },

    { key: "heroHeadline", label: "Hero - Título Principal", type: "text", placeholder: "Psicóloga especializada em...", category: "Configurações do Site" },
    { key: "heroSubheadline", label: "Hero - Subtítulo", type: "text", placeholder: "Construir junto com você...", category: "Configurações do Site" },

    { key: "sobreMim.titulo", label: "Sobre Mim - Título", type: "text", placeholder: "Sobre Mim", category: "Sobre Mim" },
    { key: "sobreMim.texto", label: "Sobre Mim - Texto Bio", type: "textarea", placeholder: "Conte sua história profissional...", category: "Sobre Mim" },
    { key: "sobreMim.formacao", label: "Formação Acadêmica", type: "text", placeholder: "Ex: Graduação em Psicologia | Especialização em...", category: "Sobre Mim" },
    { key: "sobreMim.abordagem", label: "Abordagem Clínica (Resumo)", type: "text", placeholder: "Ex: Terapia Cognitivo-Comportamental (TCC)", category: "Sobre Mim" },
    { key: "sobreMim.youtubeVideoId", label: "YouTube Video ID (Background)", type: "text", placeholder: "Ex: eJEWocsBrbo", category: "Sobre Mim" },
];

// ── Tab: Visual do Site ──
const DESIGN_FIELDS: FieldConfig[] = [
    {
        key: "designSystem.corPrincipal", label: "Cor Principal do Site", type: "color",
        placeholder: "#1B4F5C", category: "🎨 Cores do Site",
    },
    {
        key: "designSystem.corDestaque", label: "Cor de Destaque (botões e links)", type: "color",
        placeholder: "#C89B5E", category: "🎨 Cores do Site",
    },
    {
        key: "designSystem.corFundo", label: "Cor de Fundo", type: "color",
        placeholder: "#EDE7DC", category: "🎨 Cores do Site",
    },
    {
        key: "designSystem.fonteTitulos", label: "Estilo das Letras dos Títulos", type: "select",
        placeholder: "Escolha um estilo...", category: "✍️ Estilo dos Textos",
        options: [
            { value: "Lora", label: "Lora — Elegante e clássico" },
            { value: "Playfair Display", label: "Playfair Display — Sofisticado" },
            { value: "Merriweather", label: "Merriweather — Tradicional" },
            { value: "Cormorant Garamond", label: "Cormorant Garamond — Refinado" },
            { value: "EB Garamond", label: "EB Garamond — Atemporal" },
        ],
    },
    {
        key: "designSystem.fonteCorpo", label: "Estilo das Letras do Corpo", type: "select",
        placeholder: "Escolha um estilo...", category: "✍️ Estilo dos Textos",
        options: [
            { value: "Inter", label: "Inter — Moderno e limpo" },
            { value: "Roboto", label: "Roboto — Profissional" },
            { value: "Open Sans", label: "Open Sans — Amigável" },
            { value: "Poppins", label: "Poppins — Jovem e arredondado" },
            { value: "Nunito", label: "Nunito — Suave e acolhedor" },
        ],
    },
    {
        key: "designSystem.formatoCantos", label: "Formato dos Cantos (cards e botões)", type: "select",
        placeholder: "Escolha um formato...", category: "📐 Formato e Estilo",
        options: [
            { value: "reto", label: "Reto — Cantos quadrados" },
            { value: "suave", label: "Suave — Levemente arredondados" },
            { value: "arredondado", label: "Arredondado — Bem curvos" },
        ],
    },
    {
        key: "designSystem.estiloBotoes", label: "Estilo dos Botões", type: "select",
        placeholder: "Escolha um estilo...", category: "📐 Formato e Estilo",
        options: [
            { value: "solido", label: "Sólido — Preenchido com cor" },
            { value: "contorno", label: "Contorno — Só a borda colorida" },
            { value: "arredondado", label: "Arredondado — Formato pílula" },
        ],
    },
];

const ALL_FIELDS = [...CONTENT_FIELDS, ...DESIGN_FIELDS];

/* ──────────────────────────────────────────────
   Utility
   ────────────────────────────────────────────── */

function getNestedValue(obj: Record<string, unknown>, path: string): string {
    const keys = path.split(".");
    let current: unknown = obj;
    for (const key of keys) {
        if (current === null || current === undefined || typeof current !== "object") return "";
        current = (current as Record<string, unknown>)[key];
    }
    return (current as string) || "";
}

/* ──────────────────────────────────────────────
   Component
   ────────────────────────────────────────────── */

type TabKey = "conteudo" | "visual";

export default function AdminConfiguracaoPage() {
    const [activeTab, setActiveTab] = useState<TabKey>("conteudo");
    const [content, setContent] = useState<Record<string, unknown> | null>(null);
    const [loading, setLoading] = useState(true);
    const [savingField, setSavingField] = useState<string | null>(null);
    const [savedField, setSavedField] = useState<string | null>(null);
    const [errorField, setErrorField] = useState<string | null>(null);
    const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
    const [committedValues, setCommittedValues] = useState<Record<string, string>>({});
    const [dirtyFields, setDirtyFields] = useState<Record<string, boolean>>({});
    const [editingFields, setEditingFields] = useState<Set<string>>(new Set());
    const [copied, setCopied] = useState(false);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

    // Which fields belong to the active tab
    const activeFields = activeTab === "conteudo" ? CONTENT_FIELDS : DESIGN_FIELDS;

    const fetchContent = useCallback(async () => {
        try {
            const res = await fetch(`/api/site-content?t=${Date.now()}`, {
                cache: "no-store",
            });
            const data = await res.json();
            setContent(data);

            const values: Record<string, string> = {};
            ALL_FIELDS.forEach((f) => {
                values[f.key] = getNestedValue(data, f.key);
            });
            setFieldValues(values);
            setCommittedValues({ ...values });
            setEditingFields(new Set());

            const cats: Record<string, boolean> = {};
            ALL_FIELDS.forEach((f) => { cats[f.category] = true; });
            setExpandedCategories(cats);
        } catch {
            console.error("Failed to fetch content");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchContent();
    }, [fetchContent]);

    const handleFieldChange = (key: string, value: string) => {
        setFieldValues((prev) => ({ ...prev, [key]: value }));
        setDirtyFields((prev) => ({ ...prev, [key]: true }));
    };

    const handleSaveField = async (field: string) => {
        setSavingField(field);
        setSavedField(null);
        setErrorField(null);

        try {
            const res = await fetch("/api/site-content", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ field, value: fieldValues[field] }),
            });

            if (!res.ok) throw new Error("Save failed");

            setCommittedValues((prev) => ({ ...prev, [field]: fieldValues[field] }));
            setDirtyFields((prev) => ({ ...prev, [field]: false }));
            setEditingFields((prev) => { const next = new Set(prev); next.delete(field); return next; });
            setSavedField(field);
            setTimeout(() => setSavedField(null), 2000);
        } catch {
            setErrorField(field);
            setTimeout(() => setErrorField(null), 3000);
        } finally {
            setSavingField(null);
        }
    };

    // Stats per tab — uses committedValues so it only updates when saved
    const filledCount = activeFields.filter(f => committedValues[f.key]?.trim()).length;
    const totalCount = activeFields.length;
    const percentage = totalCount > 0 ? Math.round((filledCount / totalCount) * 100) : 0;

    const pendingFields = activeFields.filter((f) => !committedValues[f.key]?.trim());
    const savedFields = activeFields.filter(f => committedValues[f.key]?.trim() && !editingFields.has(f.key));

    const handleCopyPending = () => {
        const text = pendingFields
            .map((f) => `• ${f.label}`)
            .join("\n");
        const tabName = activeTab === "conteudo" ? "Conteúdo" : "Visual";
        const msg = `Olá! Seguem os dados de ${tabName} que ainda preciso preencher no site:\n\n${text}`;
        navigator.clipboard.writeText(msg);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleCategory = (cat: string) => {
        setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
    };

    const handleEditSavedItem = async (f: FieldConfig) => {
        // Immediately clear from server so F5 shows empty
        try {
            await fetch("/api/site-content", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ field: f.key, value: "" }),
            });
        } catch { /* ignore */ }
        // Clear locally
        setFieldValues((prev) => ({ ...prev, [f.key]: "" }));
        setCommittedValues((prev) => ({ ...prev, [f.key]: "" }));
        setDirtyFields((prev) => ({ ...prev, [f.key]: false }));
        setEditingFields((prev) => { const next = new Set(prev); next.delete(f.key); return next; });
        setExpandedCategories((prev) => ({ ...prev, [f.category]: true }));
    };

    const categories = [...new Set(activeFields.map((f) => f.category))];

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-bege">
                <Loader2 className="h-8 w-8 animate-spin text-petroleo" />
            </div>
        );
    }

    /* ──────────────────────────────────────────────
       Render field input based on type
       ────────────────────────────────────────────── */
    const renderFieldInput = (field: FieldConfig) => {
        const value = fieldValues[field.key] || "";

        if (field.type === "color") {
            return (
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <input
                        type="color"
                        value={value || field.placeholder}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        className="h-11 w-14 rounded-lg border border-bege-dark/30 cursor-pointer bg-white p-1 transition-all duration-200 hover:border-dourado focus:border-dourado focus:ring-2 focus:ring-dourado/20"
                    />
                    <input
                        type="text"
                        value={value}
                        onChange={(e) => handleFieldChange(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="flex-1 min-w-0 rounded-xl border border-bege-dark/30 bg-white px-4 py-3 text-sm text-petroleo placeholder:text-petroleo/30 focus:border-dourado focus:outline-none focus:ring-2 focus:ring-dourado/20 transition-all duration-200 font-mono"
                    />
                </div>
            );
        }

        if (field.type === "select" && field.options) {
            return (
                <select
                    value={value}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    className="flex-1 min-w-0 rounded-xl border border-bege-dark/30 bg-white px-4 py-3 text-sm text-petroleo focus:border-dourado focus:outline-none focus:ring-2 focus:ring-dourado/20 transition-all duration-200 cursor-pointer appearance-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%231B4F5C' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                        backgroundPosition: "right 0.75rem center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "1.25rem",
                        paddingRight: "2.5rem",
                    }}
                >
                    <option value="">{field.placeholder}</option>
                    {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            );
        }

        if (field.type === "textarea") {
            return (
                <textarea
                    rows={4}
                    value={value}
                    onChange={(e) => handleFieldChange(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="flex-1 min-w-0 rounded-xl border border-bege-dark/30 bg-white px-4 py-3 text-sm text-petroleo placeholder:text-petroleo/30 focus:border-dourado focus:outline-none focus:ring-2 focus:ring-dourado/20 transition-all duration-200 resize-none"
                />
            );
        }

        return (
            <input
                type={field.type}
                value={value}
                onChange={(e) => handleFieldChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="flex-1 min-w-0 rounded-xl border border-bege-dark/30 bg-white px-4 py-3 text-sm text-petroleo placeholder:text-petroleo/30 focus:border-dourado focus:outline-none focus:ring-2 focus:ring-dourado/20 transition-all duration-200"
            />
        );
    };

    return (
        <div className="min-h-screen bg-bege">
            {/* Header */}
            <div className="bg-petroleo py-8 px-4 sm:px-6">
                <div className="mx-auto max-w-6xl">
                    <h1 className="font-serif text-2xl font-bold text-bege-light sm:text-3xl">
                        Painel Administrativo
                    </h1>
                    <p className="mt-2 text-bege/70 text-xl">
                        Configuração do conteúdo do site
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab("conteudo")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl text-sm font-semibold transition-all duration-200 ${
                            activeTab === "conteudo"
                                ? "bg-white/80 text-petroleo border border-b-0 border-bege-dark/20 shadow-sm"
                                : "bg-bege-dark/30 text-petroleo/50 hover:bg-bege-dark/50 hover:text-petroleo/70"
                        }`}
                    >
                        <FileText className="h-4 w-4" />
                        Conteúdo do Site
                    </button>
                    <button
                        onClick={() => setActiveTab("visual")}
                        className={`flex items-center gap-2 px-6 py-3 rounded-t-2xl text-sm font-semibold transition-all duration-200 ${
                            activeTab === "visual"
                                ? "bg-white/80 text-petroleo border border-b-0 border-bege-dark/20 shadow-sm"
                                : "bg-bege-dark/30 text-petroleo/50 hover:bg-bege-dark/50 hover:text-petroleo/70"
                        }`}
                    >
                        <Palette className="h-4 w-4" />
                        Visual do Site
                    </button>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    {/* Form Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Card */}
                        <div className="rounded-b-3xl rounded-tr-3xl bg-[#5b3a1a] text-[#c1b59f] shadow-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-dourado/10 blur-3xl rounded-full -mr-16 -mt-16" />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-2">
                                    <h3 className="font-serif text-2xl font-bold text-white">
                                        {activeTab === "conteudo" ? "Conteúdo do Site" : "Visual do Site"}
                                    </h3>
                                    {activeTab === "conteudo" ? (
                                        <div className="flex flex-col gap-4 text-[#c1b59f] mt-4 max-w-2xl">
                                            {/* Bloco 1 */}
                                            <div className="flex items-center gap-2 text-sm">
                                                <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                                                <p>Preencha seus dados. Tudo o que você digita é salvo automaticamente.</p>
                                            </div>

                                            {/* Bloco 2 */}
                                            <div className="bg-[#c1b59f]/10 p-4 rounded-md border border-[#c1b59f]/20 flex gap-3 items-start">
                                                <Lightbulb className="w-5 h-5 text-white shrink-0 mt-0.5" />
                                                <p className="text-sm">Sem tempo agora? Use o botão "Copiar Pendências" ao lado para colar no WhatsApp e terminar de preencher depois.</p>
                                            </div>

                                            {/* Bloco 3 */}
                                            <div className="flex gap-2 items-center text-sm opacity-90">
                                                <Clock className="w-5 h-5 text-white shrink-0" />
                                                <p>Nota: Alterações levam cerca de 2 minutos para refletir no site no ar.</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-[#c1b59f] text-lg sm:text-xl max-w-2xl mt-4">
                                            <p>Personalize as cores, fontes e estilo do seu site.</p>
                                            <span className="block mt-3 font-medium text-white">
                                                Clique na cor para abrir a paleta. Escolha a fonte nos menus.
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-center md:items-end bg-white/5 p-4 rounded-2xl border border-white/10 min-w-[140px]">
                                    <span className="text-3xl font-bold text-white">
                                        {percentage}%
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-[#c1b59f] mt-1">Concluído</span>
                                    <div className="h-1.5 w-24 bg-white/20 rounded-full mt-3 overflow-hidden">
                                        <div
                                            className="h-full bg-dourado transition-all duration-1000 ease-out"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Category Forms */}
                        {categories.map((cat) => {
                            const catFields = activeFields.filter((f) => f.category === cat);
                            // formFields defines what is visible in the form (not yet saved to the server)
                            const formFields = catFields.filter((f) => !committedValues[f.key]?.trim() || editingFields.has(f.key));
                            // pendingCatFields is just for the "X pendentes" badge (now based on saved state)
                            const pendingCatFields = catFields.filter((f) => !committedValues[f.key]?.trim());
                            const isExpanded = expandedCategories[cat] ?? true;

                            if (formFields.length === 0) return null;

                            return (
                                <div
                                    key={cat}
                                    className="rounded-2xl bg-white/80 backdrop-blur-sm border border-bege-dark/20 shadow-sm overflow-hidden"
                                >
                                    <button
                                        onClick={() => toggleCategory(cat)}
                                        className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-bege-light/50 transition-colors duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <h2 className="font-serif text-lg font-bold text-petroleo">
                                                {cat}
                                            </h2>
                                            <span className="text-xs bg-petroleo/10 text-petroleo px-2 py-0.5 rounded-full">
                                                {pendingCatFields.length} pendente{pendingCatFields.length !== 1 ? "s" : ""}
                                            </span>
                                        </div>
                                        {isExpanded ? (
                                            <ChevronUp className="h-5 w-5 text-petroleo/50" />
                                        ) : (
                                            <ChevronDown className="h-5 w-5 text-petroleo/50" />
                                        )}
                                    </button>

                                    {isExpanded && (
                                        <div className="px-4 sm:px-6 pb-6 space-y-5 border-t border-bege-dark/10 pt-5">
                                            {formFields.map((field) => {
                                                const isDirty = dirtyFields[field.key] || false;
                                                const isSaving = savingField === field.key;
                                                const isSaved = savedField === field.key;
                                                const isError = errorField === field.key;
                                                const showButton = isDirty || isSaving || isSaved || isError;

                                                return (
                                                    <div key={field.key} className="flex flex-col gap-1.5">
                                                        <label className="block text-sm font-medium text-petroleo">
                                                            {field.label}
                                                        </label>
                                                        <div className="flex w-full items-center gap-2">
                                                            {renderFieldInput(field)}
                                                            <div className={`transition-all duration-200 ${showButton ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}>
                                                                <Button
                                                                    variant={isSaved ? "success" : isError ? "outline" : "default"}
                                                                    size="icon"
                                                                    onClick={() => handleSaveField(field.key)}
                                                                    disabled={isSaving}
                                                                    aria-label={isSaving ? "Salvando" : isSaved ? "Salvo" : isError ? "Erro" : "Salvar"}
                                                                >
                                                                    {isSaving ? (
                                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                                    ) : isSaved ? (
                                                                        <Check className="h-4 w-4" />
                                                                    ) : isError ? (
                                                                        <AlertCircle className="h-4 w-4 text-red-500" />
                                                                    ) : (
                                                                        <Check className="h-4 w-4" />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        {isSaved && (
                                                            <p className="text-xs text-green-600 flex items-center gap-1">
                                                                <Check className="h-3 w-3" /> Salvo com sucesso
                                                            </p>
                                                        )}
                                                        {isError && (
                                                            <p className="text-xs text-red-500 flex items-center gap-1">
                                                                <AlertCircle className="h-3 w-3" /> Erro ao salvar. Tente novamente.
                                                            </p>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        {/* Saved Items */}
                        {savedFields.length > 0 && (
                            <div className="rounded-2xl bg-white/40 backdrop-blur-sm border border-bege-dark/20 shadow-sm p-6 sm:p-8 transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <Check className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl font-bold text-petroleo">Itens Já Salvos</h3>
                                        <p className="text-sm text-petroleo/60">Clique em qualquer item para editá-lo novamente</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                                    {savedFields.map((f) => (
                                        <button
                                            key={f.key}
                                            onClick={() => handleEditSavedItem(f)}
                                            className="flex items-center gap-2 text-sm text-petroleo/70 bg-green-50/50 px-4 py-2 rounded-lg border border-green-100 hover:bg-dourado/10 hover:border-dourado/30 hover:text-petroleo transition-all duration-200 cursor-pointer text-left group"
                                        >
                                            {f.type === "color" && committedValues[f.key] ? (
                                                <span
                                                    className="h-4 w-4 rounded-full border border-petroleo/20 shrink-0 group-hover:hidden"
                                                    style={{ backgroundColor: committedValues[f.key] }}
                                                />
                                            ) : (
                                                <Check className="h-4 w-4 text-green-600 shrink-0 group-hover:hidden" />
                                            )}
                                            <AlertCircle className="h-4 w-4 text-dourado shrink-0 hidden group-hover:block" />
                                            <span className="flex-1">{f.label}</span>
                                            {f.type === "color" && committedValues[f.key] && (
                                                <span className="text-[10px] font-mono text-petroleo/40 group-hover:hidden">{committedValues[f.key]}</span>
                                            )}
                                            <span className="text-[10px] text-petroleo/30 group-hover:text-dourado hidden md:block">editar</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="sticky top-6 space-y-6">
                            {/* Pending Checklist */}
                            <div className="rounded-2xl bg-white/80 backdrop-blur-sm border border-bege-dark/20 shadow-sm p-6">
                                <h3 className="font-serif text-md font-bold text-petroleo mb-4 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-dourado" />
                                        O que falta?
                                    </span>
                                    <span className="text-[10px] bg-dourado/10 text-dourado px-2 py-0.5 rounded-full font-bold">
                                        {pendingFields.length}
                                    </span>
                                </h3>

                                {pendingFields.length === 0 ? (
                                    <div className="text-center py-4">
                                        <Check className="h-8 w-8 text-green-500 mx-auto mb-2" />
                                        <p className="text-sm text-petroleo/70 font-medium">
                                            Tudo pronto! 🎉
                                        </p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                            {pendingFields.map((f) => (
                                                <div
                                                    key={f.key}
                                                    className="flex items-start gap-2 text-sm group"
                                                >
                                                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-dourado/60 shrink-0 group-hover:scale-125 transition-transform" />
                                                    <span className="text-petroleo/70">{f.label}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-bege-dark/10">
                                            <Button
                                                onClick={handleCopyPending}
                                                variant="secondary"
                                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-petroleo px-4 py-3 text-sm font-medium text-bege-light shadow-sm hover:bg-petroleo-light hover:shadow-md hover:text-bege-light"
                                            >
                                                {copied ? (
                                                    <><ClipboardCheck className="h-4 w-4" /> Copiado!</>
                                                ) : (
                                                    <><Copy className="h-4 w-4" /> Copiar Pendências</>
                                                )}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Note */}
                            <div className="rounded-2xl bg-white/60 border border-dashed border-bege-dark/30 p-5 text-center">
                                <p className="text-xs font-medium text-petroleo/50 flex flex-col items-center gap-2 italic">
                                    <ChevronDown className="h-4 w-4 text-dourado/50 animate-bounce" />
                                    Itens salvos e botões extras no final da página
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
