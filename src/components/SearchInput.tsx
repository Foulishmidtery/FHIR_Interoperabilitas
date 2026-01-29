import { Search } from 'lucide-react';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export function SearchInput({ 
  placeholder = "Cari...", 
  value, 
  onChange,
  className = "",
  style 
}: SearchInputProps) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }} className={className}>
      <div style={{
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
        opacity: 0.6,
        color: 'var(--text-muted)'
      }}>
        <Search size={18} />
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="form-input"
        placeholder={placeholder}
        style={{ paddingLeft: '44px' }}
      />
    </div>
  );
}