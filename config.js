// Isi alamat repository sumber notebook agar tombol Google Colab aktif.
// Contoh: owner: "nama-akun", repo: "nlp-studio-untar"
const SITE_CONFIG = {
  githubOwner: "LabiraRiset",
  githubRepo: "NLP_Course",
  githubBranch: "main"
};

function colabNotebookUrl(path) {
  const c = resolvedRepository();
  return `https://colab.research.google.com/github/${c.githubOwner}/${c.githubRepo}/blob/${c.githubBranch}/${path}`;
}

function repositoryConfigured() {
  const c = resolvedRepository();
  return c.githubOwner !== "GITHUB_USERNAME" && c.githubRepo;
}

function resolvedRepository() {
  const c = {...SITE_CONFIG};
  // GitHub Pages project site: https://OWNER.github.io/REPOSITORY/
  if (c.githubOwner === "GITHUB_USERNAME" && location.hostname.endsWith(".github.io")) {
    c.githubOwner = location.hostname.replace(".github.io", "");
    const firstPath = location.pathname.split("/").filter(Boolean)[0];
    if (firstPath) c.githubRepo = firstPath;
  }
  return c;
}

function openNotebook(kind, path) {
  if (!repositoryConfigured()) {
    alert("Alamat repository belum dikonfigurasi. Ubah githubOwner dan githubRepo pada config.js setelah repository GitHub dibuat.");
    return;
  }
  window.open(colabNotebookUrl(path), "_blank", "noopener,noreferrer");
}
