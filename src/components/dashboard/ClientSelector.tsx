import { useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { mockClients, Client } from '@/data/mockData';

interface ClientSelectorProps {
  onClientChange?: (client: Client) => void;
}

const ClientSelector = ({ onClientChange }: ClientSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client>(mockClients[0]);

  const handleSelect = (client: Client) => {
    setSelectedClient(client);
    setOpen(false);
    onClientChange?.(client);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-12 bg-sidebar-accent hover:bg-muted border-border/50"
        >
          <div className="flex items-center gap-2 truncate">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: selectedClient.primaryColor }}
            />
            <span className="truncate">{selectedClient.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Buscar cliente..." />
          <CommandList>
            <CommandEmpty>Nenhum cliente encontrado.</CommandEmpty>
            <CommandGroup>
              {mockClients.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.name}
                  onSelect={() => handleSelect(client)}
                  className="cursor-pointer"
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedClient.id === client.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: client.primaryColor }}
                  />
                  {client.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ClientSelector;
