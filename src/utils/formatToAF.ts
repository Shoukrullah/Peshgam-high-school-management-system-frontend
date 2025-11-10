function formatAF(phone: string | null) {
    if(!phone) return;

  // keep only digits and optional leading +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // handle leading +93 (international) separately
  if (cleaned.startsWith("+93")) {
    // remove +93 then format local 9-digit (e.g. 728131373)
    const local = cleaned.slice(3);
    const grp = local.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1-$2-$3");
    return grp ? `+93 ${grp}` : `+93 ${local}`;
  }

  // If it starts with '0' and has 10 digits: 0728131373 -> 0728-131-373
  const digits = cleaned.replace(/\D/g, "");
  if (/^0\d{9}$/.test(digits)) {
    return digits.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1-$2-$3");
  }

  // fallback: return digits unchanged
  return phone;
}

export default formatAF
