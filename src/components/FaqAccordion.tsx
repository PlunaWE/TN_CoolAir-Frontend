import { useState } from "react";
import { trackEvent } from "../lib/piwik";
import type { FaqSection } from "../lib/content";

function renderAnswer(text: string) {
  return text.split("\n\n").map((paragraph, index) => (
    <p key={index} style={{ margin: index === 0 ? 0 : "12px 0 0", lineHeight: 1.65 }}>
      {paragraph}
    </p>
  ));
}


function renderTable(headers: [string, string], rows: [string, string][]) {
  return (
    <div style={{ marginTop: 8, overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr style={{ background: "#06066d", color: "#fff" }}>
            <th style={{ textAlign: "left", padding: "12px 14px", fontSize: 14, fontWeight: 800 }}>{headers[0]}</th>
            <th style={{ textAlign: "left", padding: "12px 14px", fontSize: 14, fontWeight: 800 }}>{headers[1]}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, value], index) => (
            <tr key={label} style={{ borderTop: index === 0 ? "none" : "1px solid #ececf4" }}>
              <td style={{ padding: "11px 14px", verticalAlign: "top", fontWeight: 700, color: "#4b5563", width: "40%" }}>{label}</td>
              <td style={{ padding: "11px 14px", verticalAlign: "top", color: "#5f6472", lineHeight: 1.55 }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function FaqAccordion({ items }: { items: FaqSection[] }) {
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [openQuestionMap, setOpenQuestionMap] = useState<Record<number, number | null>>({ 0: 0 });

  function toggleSection(sectionIndex: number) {
    setOpenSection((current) => {
      const next = current === sectionIndex ? null : sectionIndex;
      if (next !== null) {
        setOpenQuestionMap((prev) => ({ ...prev, [next]: prev[next] ?? null }));
      }
      return next;
    });
  }

  function toggleQuestion(sectionIndex: number, questionIndex: number) {
    setOpenQuestionMap((prev) => ({
      ...prev,
      [sectionIndex]: prev[sectionIndex] === questionIndex ? null : questionIndex,
    }));
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {items.map((section, sectionIndex) => {
        const sectionOpen = openSection === sectionIndex;
        const openQuestion = openQuestionMap[sectionIndex] ?? null;

        return (
          <div
            key={section.title}
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={() => {
                trackEvent("faq", "toggle_section", section.title, sectionOpen ? 0 : 1);
                toggleSection(sectionIndex);
              }}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                padding: "24px 28px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 22,
                fontWeight: 800,
                color: "#06066d",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span>{section.title}</span>
              <span style={{ fontSize: 22, lineHeight: 1 }}>{sectionOpen ? "⌃" : "⌄"}</span>
            </button>

            {sectionOpen ? (
              <div style={{ padding: "0 12px 16px" }}>
                {section.items.map((item, questionIndex) => {
                  const questionOpen = openQuestion === questionIndex;
                  const hasAnswer = !!item.answer || !!item.resources?.length || !!item.table;
                  return (
                    <div key={item.question} style={{ borderTop: questionIndex === 0 ? "none" : "1px solid #e6e7ef" }}>
                      <button
                        type="button"
                        onClick={() => {
                          trackEvent("faq", "toggle_question", item.question, questionOpen ? 0 : 1, { section_title: section.title });
                          toggleQuestion(sectionIndex, questionIndex);
                        }}
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          padding: "18px 18px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          cursor: "pointer",
                          textAlign: "left",
                          color: "#06066d",
                          fontSize: 16,
                          fontWeight: 800,
                          lineHeight: 1.45,
                        }}
                      >
                        <span>{item.question}</span>
                        <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0, marginLeft: 12 }}>{questionOpen ? "⌃" : "⌄"}</span>
                      </button>
                      {questionOpen && hasAnswer ? (
                        <div style={{ padding: "0 18px 18px", color: "#5f6472", fontSize: 15 }}>
                          {item.answer ? renderAnswer(item.answer) : null}
                          {item.table ? renderTable(item.table.headers, item.table.rows) : null}
                          {item.resources?.length ? (
                            <div style={{ display: "grid", gap: 10, marginTop: item.answer ? 14 : 0 }}>
                              {item.resources.map((resource) => (
                                <a
                                  key={resource.href}
                                  href={resource.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => trackEvent("faq", "resource_open", resource.label, undefined, { section_title: section.title, question: item.question, href: resource.href })}
                                  style={{ color: "#0a0a7a", textDecoration: "underline", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8 }}
                                >
                                  <span style={{ fontSize: 16 }}>📄</span><span>{resource.label}</span>
                                </a>
                              ))}
                            </div>
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
