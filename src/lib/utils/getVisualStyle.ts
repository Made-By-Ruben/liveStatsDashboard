export function getVisualStyle(): string {
    const visualStyle = localStorage.getItem('visualStyle') ?? "ROL";
    return visualStyle
}