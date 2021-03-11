import { Character, CharacterPart, CharacterPartItem, TemplateType } from '@/types/statusBoardType';
import { useCharacterTemplate } from '@/modules/statusBoard/characterTemplate';

export const useCharacterHelper = (character: Character, template: TemplateType) => {

  const characterTemplate = useCharacterTemplate();

  function addCharacterPart (name: string): void {
    const characterPart = {
      id: 'part-' + (character.parts.length + 1).toString(),
      name: name,
      items: characterTemplate.createEmptyCharacterPartItems(template),
      order: Math.max(...character.parts.map(p => p.order)) + 1
    };
    character.parts.push(characterPart);
  }

  function updateCharacterPart (part: CharacterPart): boolean {
    const characterPart = character.parts.find(p => p.id === part.id);
    if (!characterPart) return false;
    characterPart.name = part.name;
    characterPart.items = part.items;
    characterPart.order = part.order;
    return true;
  }
  
  function removeCharacterPart (part: CharacterPart): void {
    character.parts = character.parts.filter(p => p.id !== part.id);
  }

  function updateCharacterPartItem(partId: string, item: CharacterPartItem): boolean {
    const characterPart = character.parts.find(p => p.id === partId);
    if (!characterPart) return false;
    const partItem = characterPart.items.find(i => i.id === item.id);
    if (!partItem) return false;

    partItem.name = item.name;
    partItem.current = item.current;
    partItem.max = item.max;
  }

  return {
    addCharacterPart,
    updateCharacterPart,
    removeCharacterPart,
    updateCharacterPartItem
  }
};