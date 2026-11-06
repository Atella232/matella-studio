/* ==========================================================================
   Zenbaki konplexuak · Batxilergoa 1 — texts in four languages. The same
   helpers as Formula eta funtzio trigonometrikoak: inside the formulas
   write \sen (Spanish sen; Basque, English and Arabic sin), so the
   trigonometric form r(cos α + i sen α) reads right in each language.
   Arabic writes the decimal point instead of the comma. lessonTexts.ts and
   lessonChecks.ts write \sin and localizeNames gives each language its
   name. A formula never starts with z in Basque texts: the suffix tests
   read «$z» as a glued «-z», so z is written {z} everywhere.
   ========================================================================== */

export { localize, localizeNames, same, say } from '../batx1-zientziak-trigonometria/text.ts'
