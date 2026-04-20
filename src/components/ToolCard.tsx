import { Link } from "react-router-dom";
import { Tool } from "@/data/tools";
import { Eye, Clock } from "lucide-react";

const ToolCard = ({ tool }: { tool: Tool }) => (
  <Link to={`/tool/${tool.id}`} className="group block animate-fade-in-up">
    <div className="relative aspect-video overflow-hidden rounded-xl surface">
      <img
        src={tool.thumbnail}
        alt={tool.name}
        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        loading="lazy"
      />
      <span className="absolute bottom-2 right-2 text-xs px-1.5 py-0.5 rounded bg-background/80 backdrop-blur">
        <Clock className="w-3 h-3 inline mr-0.5" /> {tool.duration}
      </span>
    </div>
    <div className="pt-3">
      <h3 className="font-semibold leading-snug group-hover:text-primary transition line-clamp-2">{tool.name}</h3>
      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{tool.short}</p>
      <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
        <Eye className="w-3 h-3" /> {tool.views} views
      </p>
    </div>
  </Link>
);

export default ToolCard;
